import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page, PageStatus } from './entities/page.entity';
import { CreatePageDto, UpdatePageDto } from './dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private async updateSearchVector(pageId: string): Promise<void> {
    await this.pageRepository.query(
      `UPDATE pages SET "searchVector" = 
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(content, '')), 'B')
      WHERE id = $1`,
      [pageId],
    );
  }

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const slug = createPageDto.slug || this.generateSlug(createPageDto.title);

    const existingSlug = await this.pageRepository.findOne({ where: { slug } });
    if (existingSlug) {
      throw new ConflictException('Page with this slug already exists');
    }

    const page = this.pageRepository.create({
      ...createPageDto,
      slug,
      status: createPageDto.status || PageStatus.DRAFT,
    });

    const savedPage = await this.pageRepository.save(page);
    await this.updateSearchVector(savedPage.id);
    return savedPage;
  }

  async findAll(): Promise<Page[]> {
    return this.pageRepository.find({
      where: { status: PageStatus.PUBLISHED },
      order: { title: 'ASC' },
    });
  }

  async findAllAdmin(): Promise<Page[]> {
    return this.pageRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.pageRepository.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    return page;
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageRepository.findOne({
      where: { slug, status: PageStatus.PUBLISHED },
    });
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    return page;
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.findOne(id);

    if (updatePageDto.slug && updatePageDto.slug !== page.slug) {
      const existingSlug = await this.pageRepository.findOne({
        where: { slug: updatePageDto.slug },
      });
      if (existingSlug && existingSlug.id !== id) {
        throw new ConflictException('Page with this slug already exists');
      }
    }

    Object.assign(page, updatePageDto);
    const savedPage = await this.pageRepository.save(page);
    await this.updateSearchVector(savedPage.id);
    return savedPage;
  }

  async remove(id: string): Promise<void> {
    const page = await this.findOne(id);
    await this.pageRepository.remove(page);
  }
}
