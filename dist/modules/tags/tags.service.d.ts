import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto, UpdateTagDto } from './dto';
export declare class TagsService {
    private readonly tagRepository;
    constructor(tagRepository: Repository<Tag>);
    private generateSlug;
    create(createTagDto: CreateTagDto): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findOne(id: string): Promise<Tag>;
    findBySlug(slug: string): Promise<Tag>;
    findByIds(ids: string[]): Promise<Tag[]>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<Tag>;
    remove(id: string): Promise<void>;
}
