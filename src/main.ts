import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { MyLogger } from './winston/MyLogger';
import { WINSTON_LOGGER_TOKEN } from './winston/wiston.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  app.useStaticAssets('uploads', {
    prefix: '/api/static',
  });
  await app.listen(3000);
}
bootstrap();
