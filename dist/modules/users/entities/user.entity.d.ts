import { Post } from '../../posts/entities/post.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}
