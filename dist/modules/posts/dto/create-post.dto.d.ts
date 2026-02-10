import { PostStatus } from '../entities/post.entity';
export declare class CreatePostDto {
    title: string;
    slug?: string;
    content: string;
    excerpt?: string;
    status?: PostStatus;
    categoryId?: string;
    tagIds?: string[];
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
}
