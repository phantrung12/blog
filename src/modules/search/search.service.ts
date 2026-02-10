import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostStatus } from '../posts/entities/post.entity';
import { Page, PageStatus } from '../pages/entities/page.entity';
import { SearchQueryDto, SearchType } from './dto';

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  type: 'post' | 'page';
  rank: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async search(searchQuery: SearchQueryDto): Promise<SearchResponse> {
    const { q, type = SearchType.ALL, limit = 10 } = searchQuery;

    // Prepare search query for PostgreSQL full-text search
    const tsQuery = q
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 1)
      .map((word) => `${word}:*`)
      .join(' & ');

    const results: SearchResult[] = [];

    if (type === SearchType.ALL || type === SearchType.POSTS) {
      const posts = await this.searchPosts(tsQuery, limit);
      results.push(...posts);
    }

    if (type === SearchType.ALL || type === SearchType.PAGES) {
      const pages = await this.searchPages(tsQuery, limit);
      results.push(...pages);
    }

    // Sort by rank and limit
    results.sort((a, b) => b.rank - a.rank);
    const limitedResults = results.slice(0, limit);

    return {
      query: q,
      results: limitedResults,
      total: limitedResults.length,
    };
  }

  private async searchPosts(
    tsQuery: string,
    limit: number,
  ): Promise<SearchResult[]> {
    if (!tsQuery) return [];

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title', 'post.slug', 'post.excerpt'])
      .addSelect(
        `ts_rank(post."searchVector", to_tsquery('english', :tsQuery))`,
        'rank',
      )
      .where('post.status = :status', { status: PostStatus.PUBLISHED })
      .andWhere(`post."searchVector" @@ to_tsquery('english', :tsQuery)`, {
        tsQuery,
      })
      .orderBy('rank', 'DESC')
      .limit(limit)
      .setParameters({ tsQuery })
      .getRawAndEntities();

    return posts.entities.map((post, index) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      type: 'post' as const,
      rank: parseFloat(posts.raw[index]?.rank || '0'),
    }));
  }

  private async searchPages(
    tsQuery: string,
    limit: number,
  ): Promise<SearchResult[]> {
    if (!tsQuery) return [];

    const pages = await this.pageRepository
      .createQueryBuilder('page')
      .select(['page.id', 'page.title', 'page.slug'])
      .addSelect(
        `ts_rank(page."searchVector", to_tsquery('english', :tsQuery))`,
        'rank',
      )
      .where('page.status = :status', { status: PageStatus.PUBLISHED })
      .andWhere(`page."searchVector" @@ to_tsquery('english', :tsQuery)`, {
        tsQuery,
      })
      .orderBy('rank', 'DESC')
      .limit(limit)
      .setParameters({ tsQuery })
      .getRawAndEntities();

    return pages.entities.map((page, index) => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      excerpt: '',
      type: 'page' as const,
      rank: parseFloat(pages.raw[index]?.rank || '0'),
    }));
  }
}
