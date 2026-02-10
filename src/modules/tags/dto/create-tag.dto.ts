import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'JavaScript',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Tag slug (URL-friendly)',
    example: 'javascript',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  slug?: string;
}
