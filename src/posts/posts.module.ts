import { Module } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { PostsController } from './posts.controller';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
