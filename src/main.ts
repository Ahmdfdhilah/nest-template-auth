import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ThrottlerExceptionFilter } from './security/throttler-exception.filter';
import {NestExpressApplication} from "@nestjs/platform-express";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public/upload/', {
    prefix: '/public/upload/',
  });
  app.use(helmet());
  app.useGlobalFilters(new ThrottlerExceptionFilter());
  await app.listen(3000);
}
bootstrap();
