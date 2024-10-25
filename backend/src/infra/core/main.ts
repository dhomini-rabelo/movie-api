import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '../services/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const envService = app.get(EnvService)
  const apiPort = envService.get('API_PORT')

  await app.listen(apiPort);
}

bootstrap();
