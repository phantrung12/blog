import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Technology',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Category slug (URL-friendly)',
    example: 'technology',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  slug?: string;

  @ApiProperty({
    description: 'Category description',
    example: 'Posts about technology and programming',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
