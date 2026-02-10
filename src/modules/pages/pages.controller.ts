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
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './dto';
import { Public } from '../../common/decorators';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new page' })
  @ApiResponse({ status: 201, description: 'Page created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 409,
    description: 'Page with this slug already exists',
  })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all published pages' })
  @ApiResponse({ status: 200, description: 'List of published pages' })
  findAll() {
    return this.pagesService.findAll();
  }

  @Get('admin/all')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all pages (including drafts) - Admin only' })
  @ApiResponse({ status: 200, description: 'List of all pages' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAllAdmin() {
    return this.pagesService.findAllAdmin();
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a published page by slug' })
  @ApiResponse({ status: 200, description: 'Page found' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a page by ID' })
  @ApiResponse({ status: 200, description: 'Page found' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pagesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a page' })
  @ApiResponse({ status: 200, description: 'Page updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a page' })
  @ApiResponse({ status: 204, description: 'Page deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pagesService.remove(id);
  }
}
