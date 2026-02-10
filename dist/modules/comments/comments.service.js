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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const posts_service_1 = require("../posts/posts.service");
let CommentsService = class CommentsService {
    commentRepository;
    postsService;
    constructor(commentRepository, postsService) {
        this.commentRepository = commentRepository;
        this.postsService = postsService;
    }
    async create(postId, createCommentDto) {
        const post = await this.postsService.findOne(postId);
        const comment = this.commentRepository.create({
            ...createCommentDto,
            post,
            status: comment_entity_1.CommentStatus.PENDING,
        });
        return this.commentRepository.save(comment);
    }
    async findByPost(postId) {
        return this.commentRepository.find({
            where: {
                post: { id: postId },
                status: comment_entity_1.CommentStatus.APPROVED,
            },
            order: { createdAt: 'DESC' },
        });
    }
    async findPending() {
        return this.commentRepository.find({
            where: { status: comment_entity_1.CommentStatus.PENDING },
            relations: ['post'],
            order: { createdAt: 'ASC' },
        });
    }
    async findOne(id) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['post'],
        });
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        return comment;
    }
    async approve(id) {
        const comment = await this.findOne(id);
        comment.status = comment_entity_1.CommentStatus.APPROVED;
        return this.commentRepository.save(comment);
    }
    async reject(id) {
        const comment = await this.findOne(id);
        comment.status = comment_entity_1.CommentStatus.REJECTED;
        return this.commentRepository.save(comment);
    }
    async update(id, updateCommentDto) {
        const comment = await this.findOne(id);
        Object.assign(comment, updateCommentDto);
        return this.commentRepository.save(comment);
    }
    async remove(id) {
        const comment = await this.findOne(id);
        await this.commentRepository.remove(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        posts_service_1.PostsService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map