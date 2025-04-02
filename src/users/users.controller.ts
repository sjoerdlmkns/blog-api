import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Get('/:id/:optional?')
  public getUsers(@Param() params: any, @Query() query: any) {
    console.log(params);
    console.log(query);

    return 'You sent a get request to users endpoint';
  }

  @Post()
  public createUsers(@Body() request: Request) {
    console.log(request);
    return 'You sent a post request to users endpoint';
  }
}
