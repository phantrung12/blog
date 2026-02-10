import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { Page } from '../pages/entities/page.entity';
import { SearchQueryDto } from './dto';
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
export declare class SearchService {
    private readonly postRepository;
    private readonly pageRepository;
    constructor(postRepository: Repository<Post>, pageRepository: Repository<Page>);
    search(searchQuery: SearchQueryDto): Promise<SearchResponse>;
    private searchPosts;
    private searchPages;
}
