import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type BasicDetailsDocument = HydratedDocument<BasicDetails>;

@Schema({ timestamps: true })
export class BasicDetails {
    @Prop({ type: Types.ObjectId, ref: 'user', required: true })
    adminUserId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'packages', required: true })
    packageId: Types.ObjectId;

    @Prop({ required: true })
    businessBrandName: string;

    @Prop({ required: true })
    businessTypeIndustry: string;

    @Prop()
    websiteURL: string;

    @Prop({ default: "" })
    countryCode: string;

    @Prop({ default: "" })
    contact: string;
}

export const BasicDetailsSchema = SchemaFactory.createForClass(BasicDetails);