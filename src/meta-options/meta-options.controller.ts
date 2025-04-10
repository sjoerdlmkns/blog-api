import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  @Post()
  @ApiOperation({
    summary: 'Creates a new meta option',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response if your meta option is created successfully',
  })
  public createMetaOptions(
    @Body() createMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    console.log(createMetaOptionsDto);
  }
}
