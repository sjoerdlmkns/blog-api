import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dtos/signin.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    // Inject users service
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject hashing provider
    private readonly hashingProvider: HashingProvider,

    // Inject token provider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    // Find user using email ID;
    // Throw an exception if user not found;
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare password to the hash;
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }

    return await this.generateTokensProvider.generateTokens(user);
  }
}
