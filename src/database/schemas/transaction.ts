import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    adminUserId: Types.ObjectId;

    @Prop({ required: true })
    planId: string;

    @Prop({ required: true, unique: true })
    paymentId: string;

    @Prop({ required: true })
    subscriptionId: string;

    @Prop()
    invoiceId: string;

    @Prop()
    invoiceURL: string;

    @Prop()
    signature: string;

    @Prop()
    customerId: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ default: "INR" })
    currency: string;

    @Prop()
    paymentMethod: string;

    @Prop({ type: Object })
    cardDetails: Record<string, any>;

    @Prop({
        enum: [
            "created",
            "active",
            "pending",
            "failed",
            "cancelled",
            "completed",
            "refunded"
        ],
        default: "created"
    })
    status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);