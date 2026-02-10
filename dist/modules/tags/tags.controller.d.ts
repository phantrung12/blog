import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<import("./entities/tag.entity").Tag>;
    findAll(): Promise<import("./entities/tag.entity").Tag[]>;
    findOne(id: string): Promise<import("./entities/tag.entity").Tag>;
    findBySlug(slug: string): Promise<import("./entities/tag.entity").Tag>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<import("./entities/tag.entity").Tag>;
    remove(id: string): Promise<void>;
}
