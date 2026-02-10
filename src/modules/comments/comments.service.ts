import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment, CommentStatus } from './entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postsService.findOne(postId);

    const comment = this.commentRepository.create({
      ...createCommentDto,
      post,
      status: CommentStatus.PENDING,
    });

    return this.commentRepository.save(comment);
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        post: { id: postId },
        status: CommentStatus.APPROVED,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findPending(): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { status: CommentStatus.PENDING },
      relations: ['post'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['post'],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async approve(id: string): Promise<Comment> {
    const comment = await this.findOne(id);
    comment.status = CommentStatus.APPROVED;
    return this.commentRepository.save(comment);
  }

  async reject(id: string): Promise<Comment> {
    const comment = await this.findOne(id);
    comment.status = CommentStatus.REJECTED;
    return this.commentRepository.save(comment);
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(id);
    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}
