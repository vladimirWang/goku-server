import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import * as crypto from 'crypto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { WINSTON_LOGGER_TOKEN } from 'src/winston/wiston.module';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  constructor(@Inject(WINSTON_LOGGER_TOKEN) private loggerToken: any) {}
  private logger = new Logger();

  @InjectEntityManager()
  private manager: EntityManager;

  async findOne(uid: number): Promise<User | undefined> {
    console.log(this.manager.findBy, uid, '---this.manager.findBy');
    const found = await this.manager.findOne(User, { where: { id: uid } });
    return found;
    // return this.manager.findBy(User, { where: { id: uid } });
  }

  async login(user: LoginDto) {
    const foundUser = await this.manager.findOneBy(User, {
      username: user.username,
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  }

  async create(user: RegisterUserDto) {
    const foundUser = await this.manager.findOneBy(User, {
      username: user.username,
    });
    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    try {
      await this.manager.save(User, newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }
}
