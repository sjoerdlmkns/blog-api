import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    // Injecting users service
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public login(email: string, password: string, id: string) {
    const user = this.usersService.findOneById(1234);
    return 'SAMPLE_TOKEN';
    // login
    // token
  }

  public isAuth() {
    return true;
  }
}
