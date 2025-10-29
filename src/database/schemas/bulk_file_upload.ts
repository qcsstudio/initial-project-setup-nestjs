import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type BulkUploadJobDocument = HydratedDocument<BulkUploadJob>;

@Schema()
export class BulkUploadJob {
    @Prop({ type: Types.ObjectId, required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    fileUrl: string;

    @Prop({ enum: ["pending", "processing", "published", "failed"], default: "pending" })
    status: string;

    @Prop()
    errorMessage: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const BulkUploadJobSchema = SchemaFactory.createForClass(BulkUploadJob);