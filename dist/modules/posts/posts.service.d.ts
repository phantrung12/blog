import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto';
import { PaginatedResult } from '../../common/dto';
import { User } from '../users/entities/user.entity';
import { CategoriesService } from '../categories/categories.service';
import { TagsService } from '../tags/tags.service';
export declare class PostsService {
    private readonly postRepository;
    private readonly categoriesService;
    private readonly tagsService;
    constructor(postRepository: Repository<Post>, categoriesService: CategoriesService, tagsService: TagsService);
    private generateSlug;
    private updateSearchVector;
    create(createPostDto: CreatePostDto, author: User): Promise<Post>;
    private createBaseQuery;
    findAll(query: PostQueryDto): Promise<PaginatedResult<Post>>;
    findAllAdmin(query: PostQueryDto): Promise<PaginatedResult<Post>>;
    findOne(id: string): Promise<Post>;
    findBySlug(slug: string): Promise<Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: string): Promise<void>;
}
