import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RazorPayPlanDocument = HydratedDocument<RazorPayPlan>;

@Schema({ timestamps: true })
export class RazorPayPlan {
    @Prop({ enum: ["monthly", "yearly"], required: true })
    type: string;

    @Prop({ enum: ["IN", "US"], required: true })
    country: string;

    @Prop({ enum: ["INR", "USD"], required: true })
    currency: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ enum: ["active", "inactive"], default: "active" })
    status: string;

    @Prop({ required: true, unique: true })
    planId: string;
}

export const RazorPayPlanSchema = SchemaFactory.createForClass(RazorPayPlan);