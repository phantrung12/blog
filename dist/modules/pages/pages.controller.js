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
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pages_service_1 = require("./pages.service");
const dto_1 = require("./dto");
const decorators_1 = require("../../common/decorators");
let PagesController = class PagesController {
    pagesService;
    constructor(pagesService) {
        this.pagesService = pagesService;
    }
    create(createPageDto) {
        return this.pagesService.create(createPageDto);
    }
    findAll() {
        return this.pagesService.findAll();
    }
    findAllAdmin() {
        return this.pagesService.findAllAdmin();
    }
    findBySlug(slug) {
        return this.pagesService.findBySlug(slug);
    }
    findOne(id) {
        return this.pagesService.findOne(id);
    }
    update(id, updatePageDto) {
        return this.pagesService.update(id, updatePageDto);
    }
    remove(id) {
        return this.pagesService.remove(id);
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new page' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Page created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Page with this slug already exists',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePageDto]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all published pages' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of published pages' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pages (including drafts) - Admin only' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all pages' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findAllAdmin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a published page by slug' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Page found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Page not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findBySlug", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a page by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Page found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Page not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a page' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Page updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Page not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePageDto]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a page' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Page deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Page not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "remove", null);
exports.PagesController = PagesController = __decorate([
    (0, swagger_1.ApiTags)('Pages'),
    (0, common_1.Controller)('pages'),
    __metadata("design:paramtypes", [pages_service_1.PagesService])
], PagesController);
//# sourceMappingURL=pages.controller.js.map