import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as Schema from './schemas/index'

@Global()
@Module({
  imports: [MongooseModule.forFeature([
    { name: 'users', schema: Schema.Users.UserSchema },
    // { name: 'otps', schema: Schema.Otps.OtpSchema },
    { name: 'sessions', schema: Schema.Sessions.SessionSchema },
    // { name: 'plans', schema: Schema.Plans.PlansSchema },
    // { name: 'subscriptions', schema: Schema.Subscription.SubscriptionSchema },
    { name: 'send_notifications', schema: Schema.SendNotifications.SendNotificationsSchema },
  ])],
  // controllers: [DatabaseService],
  providers: [DatabaseService],
  exports: [DatabaseService]

})
export class DatabaseModule { }
