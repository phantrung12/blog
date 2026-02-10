import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const slug = createTagDto.slug || this.generateSlug(createTagDto.name);

    const existing = await this.tagRepository.findOne({
      where: [{ name: createTagDto.name }, { slug }],
    });

    if (existing) {
      throw new ConflictException('Tag with this name or slug already exists');
    }

    const tag = this.tagRepository.create({
      ...createTagDto,
      slug,
    });

    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async findBySlug(slug: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { slug } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async findByIds(ids: string[]): Promise<Tag[]> {
    if (!ids.length) return [];
    return this.tagRepository.find({
      where: { id: In(ids) },
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);

    if (updateTagDto.name && updateTagDto.name !== tag.name) {
      const existing = await this.tagRepository.findOne({
        where: { name: updateTagDto.name },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('Tag with this name already exists');
      }
    }

    if (updateTagDto.slug && updateTagDto.slug !== tag.slug) {
      const existing = await this.tagRepository.findOne({
        where: { slug: updateTagDto.slug },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('Tag with this slug already exists');
      }
    }

    Object.assign(tag, updateTagDto);
    return this.tagRepository.save(tag);
  }

  async remove(id: string): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagRepository.remove(tag);
  }
}
