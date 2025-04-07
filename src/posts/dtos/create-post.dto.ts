import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';

export class CreatePostDto {
  title: string;
  postType: postType;
  slug: string;
  status: postStatus;
  content?: string;
  schema?: string;
  featuredImageUrl?: string;
  publishOn: Date;
  tags?: string[];
  metaOptions?: { key: string; value: any }[];
}
