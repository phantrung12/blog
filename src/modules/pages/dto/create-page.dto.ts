import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { PageStatus } from '../entities/page.entity';

export class CreatePageDto {
  @ApiProperty({
    description: 'Page title',
    example: 'About Me',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({
    description: 'Page slug (URL-friendly)',
    example: 'about-me',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  slug?: string;

  @ApiProperty({
    description: 'Page content (HTML or Markdown)',
    example: '<p>Welcome to my blog...</p>',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'Page status',
    enum: PageStatus,
    default: PageStatus.DRAFT,
  })
  @IsEnum(PageStatus)
  @IsOptional()
  status?: PageStatus;

  // SEO fields
  @ApiPropertyOptional({
    description: 'SEO meta title',
    example: 'About Me | My Blog',
    maxLength: 70,
  })
  @IsString()
  @IsOptional()
  @MaxLength(70)
  metaTitle?: string;

  @ApiPropertyOptional({
    description: 'SEO meta description',
    example: 'Learn more about the author of this blog',
    maxLength: 160,
  })
  @IsString()
  @IsOptional()
  @MaxLength(160)
  metaDescription?: string;
}
