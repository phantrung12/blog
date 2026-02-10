import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(postId: string, createCommentDto: CreateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    findByPost(postId: string): Promise<import("./entities/comment.entity").Comment[]>;
    findPending(): Promise<import("./entities/comment.entity").Comment[]>;
    approve(id: string): Promise<import("./entities/comment.entity").Comment>;
    reject(id: string): Promise<import("./entities/comment.entity").Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    remove(id: string): Promise<void>;
}
