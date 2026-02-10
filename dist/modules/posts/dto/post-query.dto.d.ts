import { PaginationDto } from '../../../common/dto';
import { PostStatus } from '../entities/post.entity';
export declare class PostQueryDto extends PaginationDto {
    status?: PostStatus;
    categoryId?: string;
    categorySlug?: string;
    tagId?: string;
    tagSlug?: string;
    sortBy?: 'createdAt' | 'publishedAt' | 'title';
    sortOrder?: 'ASC' | 'DESC';
}
