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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const page_entity_1 = require("./entities/page.entity");
let PagesService = class PagesService {
    pageRepository;
    constructor(pageRepository) {
        this.pageRepository = pageRepository;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    async updateSearchVector(pageId) {
        await this.pageRepository.query(`UPDATE pages SET "searchVector" = 
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(content, '')), 'B')
      WHERE id = $1`, [pageId]);
    }
    async create(createPageDto) {
        const slug = createPageDto.slug || this.generateSlug(createPageDto.title);
        const existingSlug = await this.pageRepository.findOne({ where: { slug } });
        if (existingSlug) {
            throw new common_1.ConflictException('Page with this slug already exists');
        }
        const page = this.pageRepository.create({
            ...createPageDto,
            slug,
            status: createPageDto.status || page_entity_1.PageStatus.DRAFT,
        });
        const savedPage = await this.pageRepository.save(page);
        await this.updateSearchVector(savedPage.id);
        return savedPage;
    }
    async findAll() {
        return this.pageRepository.find({
            where: { status: page_entity_1.PageStatus.PUBLISHED },
            order: { title: 'ASC' },
        });
    }
    async findAllAdmin() {
        return this.pageRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const page = await this.pageRepository.findOne({ where: { id } });
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        return page;
    }
    async findBySlug(slug) {
        const page = await this.pageRepository.findOne({
            where: { slug, status: page_entity_1.PageStatus.PUBLISHED },
        });
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        return page;
    }
    async update(id, updatePageDto) {
        const page = await this.findOne(id);
        if (updatePageDto.slug && updatePageDto.slug !== page.slug) {
            const existingSlug = await this.pageRepository.findOne({
                where: { slug: updatePageDto.slug },
            });
            if (existingSlug && existingSlug.id !== id) {
                throw new common_1.ConflictException('Page with this slug already exists');
            }
        }
        Object.assign(page, updatePageDto);
        const savedPage = await this.pageRepository.save(page);
        await this.updateSearchVector(savedPage.id);
        return savedPage;
    }
    async remove(id) {
        const page = await this.findOne(id);
        await this.pageRepository.remove(page);
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(page_entity_1.Page)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PagesService);
//# sourceMappingURL=pages.service.js.map