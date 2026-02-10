import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto';
import { User } from '../users/entities/user.entity';
interface RequestWithUser extends Request {
    user: User;
}
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, req: RequestWithUser): Promise<import("./entities/post.entity").Post>;
    findAll(query: PostQueryDto): Promise<import("../../common/dto").PaginatedResult<import("./entities/post.entity").Post>>;
    findAllAdmin(query: PostQueryDto): Promise<import("../../common/dto").PaginatedResult<import("./entities/post.entity").Post>>;
    findBySlug(slug: string): Promise<import("./entities/post.entity").Post>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<void>;
}
export {};
