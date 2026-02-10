import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Comment } from '../../comments/entities/comment.entity';
export declare enum PostStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}
export declare class Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    status: PostStatus;
    publishedAt: Date | null;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    searchVector: string;
    author: User;
    category: Category | null;
    tags: Tag[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
