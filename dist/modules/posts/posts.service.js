"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const categories_service_1 = require("../categories/categories.service");
const tags_service_1 = require("../tags/tags.service");
let PostsService = class PostsService {
    postRepository;
    categoriesService;
    tagsService;
    constructor(postRepository, categoriesService, tagsService) {
        this.postRepository = postRepository;
        this.categoriesService = categoriesService;
        this.tagsService = tagsService;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    async updateSearchVector(postId) {
        await this.postRepository.query(`UPDATE posts SET "searchVector" = 
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(excerpt, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(content, '')), 'C')
      WHERE id = $1`, [postId]);
    }
    async create(createPostDto, author) {
        const slug = createPostDto.slug || this.generateSlug(createPostDto.title);
        const existingSlug = await this.postRepository.findOne({ where: { slug } });
        if (existingSlug) {
            throw new common_1.ConflictException('Post with this slug already exists');
        }
        let category = null;
        if (createPostDto.categoryId) {
            category = await this.categoriesService.findOne(createPostDto.categoryId);
        }
        let tags = [];
        if (createPostDto.tagIds?.length) {
            tags = await this.tagsService.findByIds(createPostDto.tagIds);
        }
        const post = this.postRepository.create({
            title: createPostDto.title,
            slug,
            content: createPostDto.content,
            excerpt: createPostDto.excerpt,
            status: createPostDto.status || post_entity_1.PostStatus.DRAFT,
            metaTitle: createPostDto.metaTitle,
            metaDescription: createPostDto.metaDescription,
            metaKeywords: createPostDto.metaKeywords,
            author,
            category,
            tags,
            publishedAt: createPostDto.status === post_entity_1.PostStatus.PUBLISHED ? new Date() : null,
        });
        const savedPost = await this.postRepository.save(post);
        await this.updateSearchVector(savedPost.id);
        return savedPost;
    }
    createBaseQuery() {
        return this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.category', 'category')
            .leftJoinAndSelect('post.tags', 'tags');
    }
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const qb = this.createBaseQuery();
        qb.where('post.status = :status', { status: post_entity_1.PostStatus.PUBLISHED });
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
    async findAllAdmin(query) {
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
    async findOne(id) {
        const post = await this.createBaseQuery()
            .where('post.id = :id', { id })
            .getOne();
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async findBySlug(slug) {
        const post = await this.createBaseQuery()
            .where('post.slug = :slug', { slug })
            .andWhere('post.status = :status', { status: post_entity_1.PostStatus.PUBLISHED })
            .getOne();
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async update(id, updatePostDto) {
        const post = await this.findOne(id);
        if (updatePostDto.slug && updatePostDto.slug !== post.slug) {
            const existingSlug = await this.postRepository.findOne({
                where: { slug: updatePostDto.slug },
            });
            if (existingSlug && existingSlug.id !== id) {
                throw new common_1.ConflictException('Post with this slug already exists');
            }
        }
        if (updatePostDto.categoryId) {
            post.category = await this.categoriesService.findOne(updatePostDto.categoryId);
        }
        else if (updatePostDto.categoryId === null) {
            post.category = null;
        }
        if (updatePostDto.tagIds) {
            post.tags = await this.tagsService.findByIds(updatePostDto.tagIds);
        }
        if (updatePostDto.status === post_entity_1.PostStatus.PUBLISHED &&
            post.status !== post_entity_1.PostStatus.PUBLISHED) {
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
    async remove(id) {
        const post = await this.findOne(id);
        await this.postRepository.remove(post);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        tags_service_1.TagsService])
], PostsService);
//# sourceMappingURL=posts.service.js.map