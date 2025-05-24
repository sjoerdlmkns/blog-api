import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import { App } from 'supertest/types';
import { completeUser } from './user.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    // Instantiating the application
    app = await bootstrapNestApplication();

    // Extract config
    config = app.get<ConfigService>(ConfigService);

    // Extract http server
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', () => {
    console.log(completeUser);
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it.todo('/users - firstName is mandatory');
  it.todo('/users - email is mandatory');
  it.todo('/users - password is mandatory');
  it.todo('/users - Valid request sucessfully creates user');
});
