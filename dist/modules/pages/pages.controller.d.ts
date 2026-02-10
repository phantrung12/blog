import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './dto';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    create(createPageDto: CreatePageDto): Promise<import("./entities/page.entity").Page>;
    findAll(): Promise<import("./entities/page.entity").Page[]>;
    findAllAdmin(): Promise<import("./entities/page.entity").Page[]>;
    findBySlug(slug: string): Promise<import("./entities/page.entity").Page>;
    findOne(id: string): Promise<import("./entities/page.entity").Page>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<import("./entities/page.entity").Page>;
    remove(id: string): Promise<void>;
}
