import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  slug: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;
}
