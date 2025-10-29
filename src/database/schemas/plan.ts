import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
    @Prop({ required: true })
    planType: string;

    @Prop({ required: true })
    planId: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ type: [String] })
    featureList: string[];

    @Prop({ enum: ["monthly", "yearly"], required: true })
    type: string;

    @Prop({ required: true })
    buttonText: string;

    @Prop({ required: true })
    priceINR: number;

    @Prop({ required: true })
    priceUSD: number;

    @Prop({ enum: ["IN", "US"], required: true })
    country: string;

    @Prop({ enum: ["INR", "USD"], required: true })
    currency: string;

    @Prop({ required: true })
    planDuration: string;

    @Prop({ default: 7 })
    freeDays: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
