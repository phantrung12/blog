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
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
import { Public } from '../../common/decorators';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({ status: 201, description: 'Tag created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Tag already exists' })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ status: 200, description: 'List of tags' })
  findAll() {
    return this.tagsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a tag by ID' })
  @ApiResponse({ status: 200, description: 'Tag found' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagsService.findOne(id);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a tag by slug' })
  @ApiResponse({ status: 200, description: 'Tag found' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.tagsService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a tag' })
  @ApiResponse({ status: 200, description: 'Tag updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({ status: 204, description: 'Tag deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagsService.remove(id);
  }
}
