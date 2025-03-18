import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as fs from "fs";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EventEmitter } from 'events';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
import morgan from "morgan";


config()
let { SSL, PORT, SSL_CERT, SSL_PRIV_KEY } = process.env;

let httpsOptions = {}
if (SSL == "true") {
  httpsOptions = {
    key: fs.readFileSync(SSL_PRIV_KEY),
    cert: fs.readFileSync(SSL_CERT),
  };
}

async function bootstrap() {
  const app = SSL == "true"
    ? await NestFactory.create(AppModule, { httpsOptions })
    : await NestFactory.create(AppModule);

  app.use(cors());
  app.enableCors();
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transform: true, whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Project name')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', name: 'authorization', in: 'header' }, 'authorization')
    .addServer(`http://localhost:${PORT}/`, "localserver")
    // .addServer(`https://example.com:3001/`, "staging")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  EventEmitter.defaultMaxListeners = 20;
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
  console.log(`Server running at port ${PORT}....`);
  console.log(" ")
}


bootstrap();
