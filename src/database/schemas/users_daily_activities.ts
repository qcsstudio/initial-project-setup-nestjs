import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type User_daily_activityDocument = HydratedDocument<User_daily_activity>;

@Schema({ timestamps: true })
export class User_daily_activity {

    @Prop({ type: Types.ObjectId, ref: 'users', required: false })
    user_id: Types.ObjectId = null

    @Prop({ default: 0 })
    total_steps: number = 0;

    @Prop({ default: 0 })
    total_distance: number = 0;

    @Prop({ default: 0 })
    calories_burned: number = 0;

    @Prop({ default: 0 })
    active_time: number = 0;

    @Prop({ default: 0 })
    avg_speed: number = 0;

    @Prop({ default: null })
    date: string = null;

    @Prop({ default: false })
    admin_login: boolean = false;

    @Prop({ default: null })
    token_gen_at: number = null;

    @Prop({ default: null })
    created_at: number = null;
}

export const User_daily_activitySchema = SchemaFactory.createForClass(User_daily_activity);  