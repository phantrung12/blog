import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Post, PostStatus } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto';
import { PaginatedResult } from '../../common/dto';
import { User } from '../users/entities/user.entity';
import { CategoriesService } from '../categories/categories.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService,
    private readonly tagsService: TagsService,
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private async updateSearchVector(postId: string): Promise<void> {
    await this.postRepository.query(
      `UPDATE posts SET "searchVector" = 
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(excerpt, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(content, '')), 'C')
      WHERE id = $1`,
      [postId],
    );
  }

  async create(createPostDto: CreatePostDto, author: User): Promise<Post> {
    const slug = createPostDto.slug || this.generateSlug(createPostDto.title);

    const existingSlug = await this.postRepository.findOne({ where: { slug } });
    if (existingSlug) {
      throw new ConflictException('Post with this slug already exists');
    }

    let category = null;
    if (createPostDto.categoryId) {
      category = await this.categoriesService.findOne(createPostDto.categoryId);
    }

    let tags: import('../tags/entities/tag.entity').Tag[] = [];
    if (createPostDto.tagIds?.length) {
      tags = await this.tagsService.findByIds(createPostDto.tagIds);
    }

    const post = this.postRepository.create({
      title: createPostDto.title,
      slug,
      content: createPostDto.content,
      excerpt: createPostDto.excerpt,
      status: createPostDto.status || PostStatus.DRAFT,
      metaTitle: createPostDto.metaTitle,
      metaDescription: createPostDto.metaDescription,
      metaKeywords: createPostDto.metaKeywords,
      author,
      category,
      tags,
      publishedAt:
        createPostDto.status === PostStatus.PUBLISHED ? new Date() : null,
    });

    const savedPost = await this.postRepository.save(post);
    await this.updateSearchVector(savedPost.id);
    return savedPost;
  }

  private createBaseQuery(): SelectQueryBuilder<Post> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.tags', 'tags');
  }

  async findAll(query: PostQueryDto): Promise<PaginatedResult<Post>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const qb = this.createBaseQuery();

    // Only published posts for public access
    qb.where('post.status = :status', { status: PostStatus.PUBLISHED });

    if (query.categoryId) {
      qb.andWhere('category.id = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.categorySlug) {
      qb.andWhere('category.slug = :categorySlug', {
        categorySlug: query.categorySlug,
      });
    }

    if (query.tagId) {
      qb.andWhere('tags.id = :tagId', { tagId: query.tagId });
    }

    if (query.tagSlug) {
      qb.andWhere('tags.slug = :tagSlug', { tagSlug: query.tagSlug });
    }

    const sortField = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'DESC';
    qb.orderBy(`post.${sortField}`, sortOrder);

    const [items, totalItems] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findAllAdmin(query: PostQueryDto): Promise<PaginatedResult<Post>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const qb = this.createBaseQuery();

    if (query.status) {
      qb.where('post.status = :status', { status: query.status });
    }

    if (query.categoryId) {
      qb.andWhere('category.id = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.tagId) {
      qb.andWhere('tags.id = :tagId', { tagId: query.tagId });
    }

    const sortField = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'DESC';
    qb.orderBy(`post.${sortField}`, sortOrder);

    const [items, totalItems] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.createBaseQuery()
      .where('post.id = :id', { id })
      .getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.createBaseQuery()
      .where('post.slug = :slug', { slug })
      .andWhere('post.status = :status', { status: PostStatus.PUBLISHED })
      .getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    if (updatePostDto.slug && updatePostDto.slug !== post.slug) {
      const existingSlug = await this.postRepository.findOne({
        where: { slug: updatePostDto.slug },
      });
      if (existingSlug && existingSlug.id !== id) {
        throw new ConflictException('Post with this slug already exists');
      }
    }

    if (updatePostDto.categoryId) {
      post.category = await this.categoriesService.findOne(
        updatePostDto.categoryId,
      );
    } else if (updatePostDto.categoryId === null) {
      post.category = null;
    }

    if (updatePostDto.tagIds) {
      post.tags = await this.tagsService.findByIds(updatePostDto.tagIds);
    }

    // Handle publishing
    if (
      updatePostDto.status === PostStatus.PUBLISHED &&
      post.status !== PostStatus.PUBLISHED
    ) {
      post.publishedAt = new Date();
    }

    Object.assign(post, {
      title: updatePostDto.title ?? post.title,
      slug: updatePostDto.slug ?? post.slug,
      content: updatePostDto.content ?? post.content,
      excerpt: updatePostDto.excerpt ?? post.excerpt,
      status: updatePostDto.status ?? post.status,
      metaTitle: updatePostDto.metaTitle ?? post.metaTitle,
      metaDescription: updatePostDto.metaDescription ?? post.metaDescription,
      metaKeywords: updatePostDto.metaKeywords ?? post.metaKeywords,
    });

    const savedPost = await this.postRepository.save(post);
    await this.updateSearchVector(savedPost.id);
    return savedPost;
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}
