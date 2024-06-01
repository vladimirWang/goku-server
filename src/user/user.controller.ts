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
  Patch,
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
import { storage } from '../util';

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
    FileInterceptor('file', {
      // dest: 'uploads',
      storage,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return {
      url: `/api/static/${file.filename}`,
    };
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
  @UseGuards(AuthGuard)
  @Patch()
  patch(@Body() body: any, @Request() req) {
    const { id } = req.user;
    return this.userService.patch(body, id);
  }
}
