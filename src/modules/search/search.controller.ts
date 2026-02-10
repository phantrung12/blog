import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto';
import { Public } from '../../common/decorators';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Full-text search across posts and pages' })
  @ApiResponse({ status: 200, description: 'Search results' })
  search(@Query() query: SearchQueryDto) {
    return this.searchService.search(query);
  }
}
