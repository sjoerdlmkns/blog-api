import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    // Inject data source
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // Create Query runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect Query runner to datasource
    await queryRunner.connect();

    // Start transaction
    await queryRunner.startTransaction();

    // if successful commit
    try {
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // If unsuccessful rollback
      await queryRunner.rollbackTransaction();
    } finally {
      // Release connection
      await queryRunner.release();
    }
    return newUsers;
  }
}
