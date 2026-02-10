import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsUUID,
  IsArray,
  MaxLength,
} from 'class-validator';
import { PostStatus } from '../entities/post.entity';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Getting Started with NestJS',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({
    description: 'Post slug (URL-friendly)',
    example: 'getting-started-with-nestjs',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  slug?: string;

  @ApiProperty({
    description: 'Post content (HTML or Markdown)',
    example: '<p>This is the post content...</p>',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'Short excerpt for previews',
    example: 'Learn how to build scalable APIs with NestJS',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  excerpt?: string;

  @ApiPropertyOptional({
    description: 'Post status',
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @ApiPropertyOptional({
    description: 'Category ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Array of tag IDs',
    example: ['550e8400-e29b-41d4-a716-446655440000'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tagIds?: string[];

  // SEO fields
  @ApiPropertyOptional({
    description: 'SEO meta title',
    example: 'Getting Started with NestJS | My Blog',
    maxLength: 70,
  })
  @IsString()
  @IsOptional()
  @MaxLength(70)
  metaTitle?: string;

  @ApiPropertyOptional({
    description: 'SEO meta description',
    example:
      'Learn how to build scalable server-side applications with NestJS framework',
    maxLength: 160,
  })
  @IsString()
  @IsOptional()
  @MaxLength(160)
  metaDescription?: string;

  @ApiPropertyOptional({
    description: 'SEO meta keywords',
    example: 'nestjs, nodejs, typescript, api',
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  metaKeywords?: string;
}
