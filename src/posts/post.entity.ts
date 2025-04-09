import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
  })
  status: postStatus;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  publishOn?: Date;

  tags?: string[];

  metaOptions?: CreatePostMetaOptionsDto[];
}
