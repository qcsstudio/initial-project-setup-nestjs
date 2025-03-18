import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SessionsDocument = HydratedDocument<Sessions>;

@Schema({ timestamps: true })
export class Sessions {

    @Prop({ default: 'USER', enum: ["USER", "ADMIN"] })
    type: string;

    @Prop({ type: Types.ObjectId, ref: 'users', required: false })
    user_id: Types.ObjectId = null

    @Prop({ default: 'ANDROID', enum: ["ANDROID", "IOS", "WEB"] })
    device_type: string;

    @Prop({ default: null })
    fcm_token: string = null;

    @Prop({ default: false })
    admin_login: boolean = false;

    @Prop({ default: null })
    token_gen_at: number = null;

    @Prop({ default: null })
    created_at: number = null;
}

export const SessionSchema = SchemaFactory.createForClass(Sessions);  