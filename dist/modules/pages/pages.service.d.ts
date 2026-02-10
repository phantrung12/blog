import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { CreatePageDto, UpdatePageDto } from './dto';
export declare class PagesService {
    private readonly pageRepository;
    constructor(pageRepository: Repository<Page>);
    private generateSlug;
    private updateSearchVector;
    create(createPageDto: CreatePageDto): Promise<Page>;
    findAll(): Promise<Page[]>;
    findAllAdmin(): Promise<Page[]>;
    findOne(id: string): Promise<Page>;
    findBySlug(slug: string): Promise<Page>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<Page>;
    remove(id: string): Promise<void>;
}
