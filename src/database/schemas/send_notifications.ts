import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type SendNotificationsDocument = HydratedDocument<SendNotifications>

@Schema({ timestamps: true })
export class SendNotifications {

    @Prop({ type: Types.ObjectId, ref: 'users', required: false })
    user_id: Types.ObjectId = null

    @Prop({ type: String, default: null, enum: [null, 'REMINDER',] })
    notification_type: string;

    @Prop({ default: 'SYSTEM', enum: ['SYSTEM', 'ADMIN'] })
    sender_type: string;

    @Prop({ type: String, default: null })
    title: string;

    @Prop({ type: String, default: null })
    body: string;

    @Prop({ type: Object, default: null })
    data: any;

    @Prop({ type: String, default: null })
    image: string;

    @Prop({ type: Boolean, default: false })
    is_read: boolean;

    @Prop({ type: Boolean, default: false })
    is_deleted: boolean;

    @Prop({ default: null })
    created_at: number;
}

export const SendNotificationsSchema = SchemaFactory.createForClass(SendNotifications);