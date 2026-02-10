import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;
}
