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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../posts/entities/post.entity");
const page_entity_1 = require("../pages/entities/page.entity");
const dto_1 = require("./dto");
let SearchService = class SearchService {
    postRepository;
    pageRepository;
    constructor(postRepository, pageRepository) {
        this.postRepository = postRepository;
        this.pageRepository = pageRepository;
    }
    async search(searchQuery) {
        const { q, type = dto_1.SearchType.ALL, limit = 10 } = searchQuery;
        const tsQuery = q
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 1)
            .map((word) => `${word}:*`)
            .join(' & ');
        const results = [];
        if (type === dto_1.SearchType.ALL || type === dto_1.SearchType.POSTS) {
            const posts = await this.searchPosts(tsQuery, limit);
            results.push(...posts);
        }
        if (type === dto_1.SearchType.ALL || type === dto_1.SearchType.PAGES) {
            const pages = await this.searchPages(tsQuery, limit);
            results.push(...pages);
        }
        results.sort((a, b) => b.rank - a.rank);
        const limitedResults = results.slice(0, limit);
        return {
            query: q,
            results: limitedResults,
            total: limitedResults.length,
        };
    }
    async searchPosts(tsQuery, limit) {
        if (!tsQuery)
            return [];
        const posts = await this.postRepository
            .createQueryBuilder('post')
            .select(['post.id', 'post.title', 'post.slug', 'post.excerpt'])
            .addSelect(`ts_rank(post."searchVector", to_tsquery('english', :tsQuery))`, 'rank')
            .where('post.status = :status', { status: post_entity_1.PostStatus.PUBLISHED })
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
            type: 'post',
            rank: parseFloat(posts.raw[index]?.rank || '0'),
        }));
    }
    async searchPages(tsQuery, limit) {
        if (!tsQuery)
            return [];
        const pages = await this.pageRepository
            .createQueryBuilder('page')
            .select(['page.id', 'page.title', 'page.slug'])
            .addSelect(`ts_rank(page."searchVector", to_tsquery('english', :tsQuery))`, 'rank')
            .where('page.status = :status', { status: page_entity_1.PageStatus.PUBLISHED })
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
            type: 'page',
            rank: parseFloat(pages.raw[index]?.rank || '0'),
        }));
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(page_entity_1.Page)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map