import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export enum SubscriptionTier {
    INDIVIDUAL = 'INDIVIDUAL',
    BASIC = "BASIC",
    PRO = "PRO",
    ENTERPRISE = "ENTERPRISE",
}

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription {

    @Prop({ type: Types.ObjectId, ref: 'users', default: null })
    user_id: Types.ObjectId = null

    @Prop({ type: Types.ObjectId, ref: 'plans', default: null })
    plan_id: Types.ObjectId;

    @Prop({ type: String, default: null })
    subscription_id: string;

    @Prop({ type: String, default: null })
    product_id: string;

    @Prop({ type: String, default: null })
    status: string;

    @Prop({ type: Number, default: 0 })
    start_date: number;

    @Prop({ type: Number, default: 0 })
    renewal_date: number;

    @Prop({ type: Boolean, default: false })
    is_phone_sub: boolean;

    @Prop({ type: Boolean, default: false })
    is_upgraded: boolean;

    @Prop({ type: Boolean, default: false })
    is_canceled: boolean;

    @Prop({ default: null })
    created_at: number;

    @Prop({ default: null })
    updated_at: number;

}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);  