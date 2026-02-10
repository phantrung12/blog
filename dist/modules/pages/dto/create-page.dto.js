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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const page_entity_1 = require("../entities/page.entity");
class CreatePageDto {
    title;
    slug;
    content;
    status;
    metaTitle;
    metaDescription;
}
exports.CreatePageDto = CreatePageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page title',
        example: 'About Me',
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreatePageDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page slug (URL-friendly)',
        example: 'about-me',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreatePageDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page content (HTML or Markdown)',
        example: '<p>Welcome to my blog...</p>',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page status',
        enum: page_entity_1.PageStatus,
        default: page_entity_1.PageStatus.DRAFT,
    }),
    (0, class_validator_1.IsEnum)(page_entity_1.PageStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePageDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'SEO meta title',
        example: 'About Me | My Blog',
        maxLength: 70,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(70),
    __metadata("design:type", String)
], CreatePageDto.prototype, "metaTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'SEO meta description',
        example: 'Learn more about the author of this blog',
        maxLength: 160,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], CreatePageDto.prototype, "metaDescription", void 0);
//# sourceMappingURL=create-page.dto.js.map