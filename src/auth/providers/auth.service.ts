import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    // Injecting users service
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public signIn(signInDto: SignInDto) {
    // Find user using email ID;
    // Throw an exception if user not found;
    // Compare password to the hash;
    // Sending confirmation
  }

  public isAuth() {
    return true;
  }
}
