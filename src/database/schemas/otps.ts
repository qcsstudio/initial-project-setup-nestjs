import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })  // This will automatically add 'createdAt' and 'updatedAt'
export class Otp extends Document {

    @Prop({ default: null })
    email_otp: string;

    @Prop({ default: null })
    phone_otp: string;

    @Prop({ required: true })
    email: string;  // Phone number or email associated with OTP

    @Prop({ default: Date.now, expires: 300, })
    createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
