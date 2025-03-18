import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';


@Global()
@Module({
    // imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, ConfigService],
    exports: [AuthService],
})

export class AuthModule { }

