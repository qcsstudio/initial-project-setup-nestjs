import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';


config()
const admin_sk = process.env.ADMIN_SK;
const mongo_db_uri = process.env.MONGO_DB_URI;

@Module({
  imports: [
    MongooseModule.forRoot(mongo_db_uri),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: admin_sk,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CommonModule],
  controllers: [AppController],
  providers: [
    AppService,
    AuthModule,
    AuthService,

  ],
})
export class AppModule { }
