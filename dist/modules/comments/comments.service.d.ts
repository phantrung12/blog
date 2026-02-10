import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { PostsService } from '../posts/posts.service';
export declare class CommentsService {
    private readonly commentRepository;
    private readonly postsService;
    constructor(commentRepository: Repository<Comment>, postsService: PostsService);
    create(postId: string, createCommentDto: CreateCommentDto): Promise<Comment>;
    findByPost(postId: string): Promise<Comment[]>;
    findPending(): Promise<Comment[]>;
    findOne(id: string): Promise<Comment>;
    approve(id: string): Promise<Comment>;
    reject(id: string): Promise<Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    remove(id: string): Promise<void>;
}
