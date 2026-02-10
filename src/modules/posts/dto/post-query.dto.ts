import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto';
import { PostStatus } from '../entities/post.entity';

export class PostQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @ApiPropertyOptional({
    description: 'Filter by category ID',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Filter by category slug',
  })
  @IsString()
  @IsOptional()
  categorySlug?: string;

  @ApiPropertyOptional({
    description: 'Filter by tag ID',
  })
  @IsUUID()
  @IsOptional()
  tagId?: string;

  @ApiPropertyOptional({
    description: 'Filter by tag slug',
  })
  @IsString()
  @IsOptional()
  tagSlug?: string;

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: ['createdAt', 'publishedAt', 'title'],
    default: 'createdAt',
  })
  @IsString()
  @IsOptional()
  sortBy?: 'createdAt' | 'publishedAt' | 'title' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
