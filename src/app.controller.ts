import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_LOGGER_TOKEN } from './winston/wiston.module';

@Controller()
export class AppController {
  // private logger = new Logger();
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('hello', AppController.name);
    return this.appService.getHello();
  }
}
