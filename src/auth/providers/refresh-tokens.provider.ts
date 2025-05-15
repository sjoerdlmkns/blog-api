/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    // Inject users service
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Injecting jwt service
    private readonly jwtService: JwtService,

    // Injecting jwt config
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    // Inject token provider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify the refresh token user jwtService
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      // Fetch the user from db
      const user = await this.usersService.findOneById(sub);

      // Generate the tokens
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
