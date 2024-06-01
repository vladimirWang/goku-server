import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UseGuards,
  Get,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { WINSTON_LOGGER_TOKEN } from 'src/winston/wiston.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { omit } from 'lodash';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(WINSTON_LOGGER_TOKEN)
    private logger,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body: ', body);
    console.log('file: ', file);
  }

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
        id: foundUser.id,
        username: foundUser.username,
      });
      res.setHeader('token', token);
      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const { id } = req.user;
    const found = await this.userService.findOne(id);
    return omit(found, 'password');
  }
}
