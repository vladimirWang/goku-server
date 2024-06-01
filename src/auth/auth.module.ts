import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret,
      signOptions: {
        expiresIn: '1m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
