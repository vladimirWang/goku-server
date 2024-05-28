import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger();
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('hello', AppController.name);
    return this.appService.getHello();
  }
}
