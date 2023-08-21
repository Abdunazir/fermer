import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('Fermer')
      .setDescription('This service for fermers ')
      .setVersion('1.0')
      .addTag('NodeJs, MongoDB, Mongoose')
      .build();
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3030;
    app.setGlobalPrefix('api');
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
// function cookieParser(): any {
//   throw new Error('Function not implemented.');
// }
