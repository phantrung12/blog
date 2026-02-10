import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SearchType {
  ALL = 'all',
  POSTS = 'posts',
  PAGES = 'pages',
}

export class SearchQueryDto {
  @ApiProperty({
    description: 'Search query',
    example: 'nestjs',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  q: string;

  @ApiPropertyOptional({
    description: 'Search type',
    enum: SearchType,
    default: SearchType.ALL,
  })
  @IsEnum(SearchType)
  @IsOptional()
  type?: SearchType = SearchType.ALL;

  @ApiPropertyOptional({
    description: 'Number of results to return',
    default: 10,
  })
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;
}
