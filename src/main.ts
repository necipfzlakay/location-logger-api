import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // //! if we want to add a prefix to all routes for versioning
  // app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({}));
  const port = process.env.PORT ?? 3333;
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
