import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment author name',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  authorName: string;

  @ApiProperty({
    description: 'Comment author email',
    example: 'john@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  authorEmail: string;

  @ApiProperty({
    description: 'Comment content',
    example: 'Great article! Thanks for sharing.',
    minLength: 10,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  content: string;
}
