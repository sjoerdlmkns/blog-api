/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    // Inject data source
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    // Create Query runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect Query runner to datasource
      await queryRunner.connect();

      // Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }

    // if successful commit
    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // If unsuccessful rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        // Release connection
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release connection', {
          description: String(error),
        });
      }
    }

    return {
      users: newUsers,
    };
  }
}
