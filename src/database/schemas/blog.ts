import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
    @Prop({ unique: true, required: true })
    heading: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    thumbnail: string;

    @Prop()
    sub_description: string;

    @Prop({ default: false })
    trending: boolean;

    @Prop({ default: false })
    show_on_front: boolean;

    @Prop({ type: [String] })
    category: string[];

    @Prop({ default: "Title" })
    metaTitle: string;

    @Prop({ default: "Description" })
    metaDescription: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);