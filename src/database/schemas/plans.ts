import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Plans extends Document {

    @Prop({ type: String, default: null })
    plan_name: string;

    @Prop({ type: String, default: null })
    description: string;

    @Prop({ type: String, default: null })
    product_id: string;

    @Prop({ type: String, default: null })
    plan_id: string;

    @Prop({ type: Number, default: null })
    amount: number;

    @Prop({ type: String, default: null })
    interval: string;

    @Prop({ type: String, default: null })
    currency: string;

    @Prop({ type: String, default: null })
    icon: string;

    @Prop({ type: Number, default: 1 })
    interval_count: number;

    @Prop({ type: Boolean, default: false })
    is_deleted: boolean;

    @Prop({ type: [String], default: false })
    benefits: string[];

    @Prop({ type: Number })
    created_at: number;
}
export const PlansSchema = SchemaFactory.createForClass(Plans);