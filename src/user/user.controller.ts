import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { WINSTON_LOGGER_TOKEN } from 'src/winston/wiston.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(WINSTON_LOGGER_TOKEN)
    private logger,
  ) {}
  @Post()
  create(@Body() createUserDto: RegisterUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user);

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      res.setHeader('token', token);
      // this.logger.log('hello', UserController.name);
      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
