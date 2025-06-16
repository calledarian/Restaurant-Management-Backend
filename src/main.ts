import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // strips properties not in DTO
    forbidNonWhitelisted: true, // throws error if unknown props sent
    transform: true,       // transforms payloads to DTO instances
  }));

  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('API for managing sessions and orders')
    .setVersion('1.0')
    .addTag('Sessions')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
