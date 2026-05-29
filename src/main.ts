import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = process.env.HTTP_HOST ?? '127.0.0.1';
  const port = Number(process.env.HTTP_PORT ?? 3000);
  await app.listen(port, host);
}

bootstrap();
