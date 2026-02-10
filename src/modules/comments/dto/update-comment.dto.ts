import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CommentStatus } from '../entities/comment.entity';

export class UpdateCommentDto {
  @ApiPropertyOptional({
    description: 'Comment status',
    enum: CommentStatus,
  })
  @IsEnum(CommentStatus)
  @IsOptional()
  status?: CommentStatus;
}
