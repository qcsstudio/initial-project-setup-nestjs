import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    packgeType: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ type: [String] })
    feature: string[];
}

export const PackageSchema = SchemaFactory.createForClass(Package);
