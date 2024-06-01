import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { WinstonModule } from './winston/wiston.module';
import { transports, format } from 'winston';
import * as chalk from 'chalk';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WinstonModule.forRoot({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(({ context, level, message, time }) => {
          const appStr = chalk.green(`[NEST]`);
          const contextStr = chalk.yellow(`[${context}]`);

          return `${appStr} ${time} ${level} ${contextStr} ${message} `;
        }),
        //   format.simple()
      ),
      transports: [
        new transports.Console(),
        // new transports.File({
        //   dirname: 'log',
        //   filename: 'test.log',
        //   maxsize: 1024,
        // }),
        new transports.DailyRotateFile({
          level: 'info',
          dirname: 'log',
          filename: 'test-%DATE%.log',
          datePattern: 'YYYY-MM-DD HH:mm',
          maxSize: '5k',
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: '123456',
      // password: true === 'development' ? '123456' : 'Zecheng1107$$',
      password: 'Zecheng1107$$',
      database: 'galary2',
      synchronize: false,
      logging: true,
      entities: [User],
      migrations: [],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugins: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
