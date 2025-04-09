import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    // Injecting Users Service
    private readonly usersService: UsersService,

    // Injecting Posts Repository
    @InjectRepository(Post)
    private readonly postsService: Repository<Post>,
  ) {}
  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    return [
      {
        title: 'Test title',
        content: 'Test Content',
        user: user,
      },

      {
        title: 'Test title 2',
        content: 'Test Content 2',
        user: user,
      },
    ];
  }
}
