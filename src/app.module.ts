import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TagsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User, Post, Tag],
        autoLoadEntities: true,
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        database: 'nestjs-blog',
      }),
    }),
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
