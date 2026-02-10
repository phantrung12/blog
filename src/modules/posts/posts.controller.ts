import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
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
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto';
import { Public } from '../../common/decorators';
import { User } from '../users/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 409,
    description: 'Post with this slug already exists',
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: RequestWithUser,
  ) {
    return this.postsService.create(createPostDto, req.user);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all published posts' })
  @ApiResponse({ status: 200, description: 'List of published posts' })
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all posts (including drafts) - Admin only' })
  @ApiResponse({ status: 200, description: 'List of all posts' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAllAdmin(@Query() query: PostQueryDto) {
    return this.postsService.findAllAdmin(query);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a published post by slug' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204, description: 'Post deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }
}
