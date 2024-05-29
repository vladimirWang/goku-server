import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './winston/MyLogger';
import { WINSTON_LOGGER_TOKEN } from './winston/wiston.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));
  await app.listen(3000);
}
bootstrap();
