import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum PageStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: PageStatus,
    default: PageStatus.DRAFT,
  })
  status: PageStatus;

  // SEO fields
  @Column({ type: 'varchar', length: 255, nullable: true })
  metaTitle: string | null;

  @Column({ type: 'text', nullable: true })
  metaDescription: string | null;

  // Full-text search vector
  @Index()
  @Column({
    type: 'tsvector',
    select: false,
    nullable: true,
  })
  searchVector: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
