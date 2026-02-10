import { SearchService } from './search.service';
import { SearchQueryDto } from './dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: SearchQueryDto): Promise<import("./search.service").SearchResponse>;
}
