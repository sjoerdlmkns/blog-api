import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    // Injecting Users Service
    private readonly usersService: UsersService,

    // Injecting Posts Repository
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    // Injecting MetaOption Repository
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    const author = await this.usersService.findOneById(createPostDto.authorId);

    const post = this.postsRepository.create({
      ...createPostDto,
      author,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const posts = await this.postsRepository.find();

    return posts;
  }

  public async delete(id: number) {
    // Delete the post
    await this.postsRepository.delete(id);

    // Confirm
    return { deleted: true, id };
  }
}
