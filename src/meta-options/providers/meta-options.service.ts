import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
    public create(metaOptionsDto: CreatePostMetaOptionsDto) {}
}
