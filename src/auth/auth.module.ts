import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { BycryptProvider } from './providers/bycrypt.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BycryptProvider],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService],
})
export class AuthModule {}
