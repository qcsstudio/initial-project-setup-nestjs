import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as Schema from './schemas/index'

@Injectable()
export class DatabaseService {
    constructor(
        @InjectModel('users') public Users: Model<Schema.Users.Users>,
        @InjectModel('otps') public Otps: Model<Schema.Otps.Otp>,
        @InjectModel('sessions') public Sessions: Model<Schema.Sessions.Sessions>,
        @InjectModel('subscriptions') public Subscriptions: Model<Schema.Subscription.Subscription>,
        @InjectModel('plans') public Plan: Model<Schema.Plans.Plans>,
        @InjectModel('send_notifications') public SendNotifications: Model<Schema.SendNotifications.SendNotifications>,
    ) {

    }
}
