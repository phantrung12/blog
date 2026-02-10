import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Public } from '../../common/decorators';

@ApiTags('Comments')
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Public()
  @Post('posts/:postId/comments')
  @ApiOperation({ summary: 'Submit a comment on a post (pending moderation)' })
  @ApiResponse({ status: 201, description: 'Comment submitted for moderation' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Public()
  @Get('posts/:postId/comments')
  @ApiOperation({ summary: 'Get approved comments for a post' })
  @ApiResponse({ status: 200, description: 'List of approved comments' })
  findByPost(@Param('postId', ParseUUIDPipe) postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @Get('comments/admin/pending')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get pending comments for moderation - Admin only' })
  @ApiResponse({ status: 200, description: 'List of pending comments' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findPending() {
    return this.commentsService.findPending();
  }

  @Patch('comments/:id/approve')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Approve a comment - Admin only' })
  @ApiResponse({ status: 200, description: 'Comment approved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  approve(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.approve(id);
  }

  @Patch('comments/:id/reject')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Reject a comment - Admin only' })
  @ApiResponse({ status: 200, description: 'Comment rejected' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  reject(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.reject(id);
  }

  @Patch('comments/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a comment status - Admin only' })
  @ApiResponse({ status: 200, description: 'Comment updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete('comments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a comment - Admin only' })
  @ApiResponse({ status: 204, description: 'Comment deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.remove(id);
  }
}
