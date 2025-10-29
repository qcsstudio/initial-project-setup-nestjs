import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RecentActivityDocument = HydratedDocument<RecentActivity>;

@Schema({ timestamps: true })
export class RecentActivity {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ enum: ["linkedin", "facebook", "instagram", "twitter", "youtube"], required: true })
    platform: string;

    @Prop({
        enum: [
            "post_share",
            "post_published",
            "post_scheduled",
            "comment_added",
            "like_received",
            "connection_request",
            "message_sent",
            "other"
        ],
        required: true
    })
    activityType: string;

    @Prop({ type: [String] })
    mediaUrls: string[];

    @Prop({ type: Types.ObjectId, default: null })
    referenceDbId: Types.ObjectId;

    @Prop()
    referenceIdStr: string;

    @Prop()
    referenceUrl: string;

    @Prop()
    description: string;

    @Prop({ type: Object, default: {} })
    metadata: Record<string, any>;

    @Prop({ enum: ["success", "failed", "pending"], default: "success" })
    status: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const RecentActivitySchema = SchemaFactory.createForClass(RecentActivity);