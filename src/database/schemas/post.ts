import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
    @Prop()
    postSchema: string;

    @Prop()
    privacy: string;

    @Prop({ type: [String] })
    formImage: string[];

    @Prop({ type: [String] })
    selectedAccount: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
