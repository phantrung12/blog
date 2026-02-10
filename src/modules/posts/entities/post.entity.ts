import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Comment } from '../../comments/entities/comment.entity';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string | null;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  // SEO fields
  @Column({ type: 'varchar', length: 255, nullable: true })
  metaTitle: string | null;

  @Column({ type: 'text', nullable: true })
  metaDescription: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  metaKeywords: string | null;

  // Full-text search vector
  @Index()
  @Column({
    type: 'tsvector',
    select: false,
    nullable: true,
  })
  searchVector: string;

  // Relations
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  @ManyToOne(() => Category, (category) => category.posts, { nullable: true })
  category: Category | null;

  @ManyToMany(() => Tag, (tag) => tag.posts, { eager: true })
  @JoinTable({
    name: 'posts_tags',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
