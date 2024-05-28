import { LoggerService, LogLevel } from '@nestjs/common';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import { createLogger, format, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

function getTimeStr(fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(Date.now()).format(fmt);
}

export class MyLogger implements LoggerService {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
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
    });
  }
  log(message: string, context: string) {
    const time = getTimeStr();

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    const time = getTimeStr();

    this.logger.log('error', message, { context, time });
  }

  warn(message: string, context: string) {
    const time = getTimeStr();

    this.logger.log('info', message, { context, time });
  }
}
