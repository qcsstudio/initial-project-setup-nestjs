import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type MyPlansDocument = HydratedDocument<MyPlans>;

@Schema({ timestamps: true })
export class MyPlans {
    @Prop({ type: Types.ObjectId, ref: 'Plans' })
    plan_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Users' })
    planAdminId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'packages' })
    packageId: Types.ObjectId;

    @Prop({ required: true })
    planId: string;

    @Prop({ required: true })
    subscriptionId: string;

    @Prop({ default: "" })
    planSelector: string;

    @Prop({ default: false })
    isActivePlan: boolean;

    @Prop({ default: false })
    freeTrial: boolean;

    @Prop({ default: "" })
    planActiveDate: string;

    @Prop({ default: "" })
    planEndDate: string;

    @Prop({ default: "" })
    freeDays: string;
}

export const MyPlansSchema = SchemaFactory.createForClass(MyPlans);