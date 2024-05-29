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
  constructor(options: Record<string, any>) {
    this.logger = createLogger(options);
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
