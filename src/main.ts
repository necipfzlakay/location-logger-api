import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // //! if we want to add a prefix to all routes for versioning
  // app.setGlobalPrefix('v1');
  const config = new DocumentBuilder()
    .setTitle('Location Logger API')
    .setDescription('Location Logger API description')
    .setVersion('1.0')
    .addTag('Location Logger API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({}));
  const port = process.env.PORT ?? 3333;
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
