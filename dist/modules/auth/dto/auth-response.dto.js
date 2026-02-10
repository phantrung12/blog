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
exports.MessageResponseDto = exports.ProfileResponseDto = exports.AuthResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserResponseDto {
    id;
    email;
    name;
    createdAt;
    updatedAt;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        example: 'admin@blog.com',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        example: 'Admin',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Account creation date',
        example: '2026-01-25T12:00:00.000Z',
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Account last update date',
        example: '2026-01-25T12:00:00.000Z',
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "updatedAt", void 0);
class AuthResponseDto {
    accessToken;
    tokenType;
    expiresIn;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token type',
        example: 'Bearer',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "tokenType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token expiration time',
        example: '7d',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User information',
        type: UserResponseDto,
    }),
    __metadata("design:type", UserResponseDto)
], AuthResponseDto.prototype, "user", void 0);
class ProfileResponseDto {
    id;
    email;
    name;
    createdAt;
    updatedAt;
}
exports.ProfileResponseDto = ProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        example: 'admin@blog.com',
    }),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        example: 'Admin',
    }),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Account creation date',
        example: '2026-01-25T12:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Account last update date',
        example: '2026-01-25T12:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ProfileResponseDto.prototype, "updatedAt", void 0);
class MessageResponseDto {
    message;
}
exports.MessageResponseDto = MessageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response message',
        example: 'Operation successful',
    }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "message", void 0);
//# sourceMappingURL=auth-response.dto.js.map