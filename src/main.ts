// src/main.ts
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.enableCors();

  // Registra o middleware do Fastify para servir a pasta 'public'
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/dashboard/',
  });

  const PORT = 3000;
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 API rodando com Fastify na porta: http://localhost:${PORT}`);
  console.log(
    `📊 Dashboard disponível em: http://localhost:${PORT}/dashboard/`,
  );
}

void bootstrap();
