import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({ _id: false })
export class Media {
    @Prop()
    url: string;

    @Prop()
    fileType: string;
}

@Schema({ _id: false })
export class SocialAccount {
    @Prop()
    socialAccountId: string;

    @Prop()
    socialPlatformType: string;

    @Prop()
    accessToken: string;

    @Prop()
    businessId: string;
}

@Schema({ _id: false })
export class SelectedAccount {
    @Prop()
    linkedinId: string;

    @Prop()
    linkedinToken: string;
}

export type SchedulePostDocument = HydratedDocument<SchedulePost>;

@Schema({ timestamps: true })
export class SchedulePost {
    @Prop({ type: Types.ObjectId })
    userId: Types.ObjectId;

    @Prop({ default: "" })
    text: string;

    @Prop({ default: "" })
    link: string;

    @Prop({ type: [Media] })
    medias: Media[];

    @Prop({ default: false })
    status: boolean;

    @Prop()
    postCaption: string;

    @Prop({ default: "Public" })
    privacy: string;

    @Prop({ type: [SocialAccount] })
    selectSocialAccounts: SocialAccount[];

    @Prop({ type: [SelectedAccount] })
    selectedAccount: SelectedAccount[];

    @Prop({ enum: ["scheduled", "publish", "failed", "draft"], default: "scheduled" })
    scheduled: string;

    @Prop()
    scheduleDate: string;

    @Prop()
    scheduleTime: string;
}

export const SchedulePostSchema = SchemaFactory.createForClass(SchedulePost);