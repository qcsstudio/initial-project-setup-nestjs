import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { AuthService } from 'src/auth/auth.service';
import { CommonService } from 'src/common/common.services';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [DatabaseModule, CommonModule],
  controllers: [UsersController],
  providers: [UsersService, StripeService, CommonService, AuthService],
})
export class UsersModule {}
