import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    // Injecting Posts service
    private readonly postsService: PostsService,
  ) {}

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new post',
  })
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log('Create posts controller');
    console.log(createPostDto);
    return 'Created post';
  }
}
