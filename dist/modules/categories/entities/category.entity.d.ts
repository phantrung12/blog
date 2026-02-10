import { Post } from '../../posts/entities/post.entity';
export declare class Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    posts: Post[];
    createdAt: Date;
}
