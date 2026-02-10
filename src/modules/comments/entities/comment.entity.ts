import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

export enum CommentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  authorName: string;

  @Column({ type: 'varchar', length: 255 })
  authorEmail: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: CommentStatus,
    default: CommentStatus.PENDING,
  })
  status: CommentStatus;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
