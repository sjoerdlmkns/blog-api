import { Module } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UsersModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
