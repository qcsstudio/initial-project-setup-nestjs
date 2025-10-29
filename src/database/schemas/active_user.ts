import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ActiveUserDocument = HydratedDocument<ActiveUser>;

@Schema({ timestamps: true })
export class ActiveUser {
    @Prop({ type: Types.ObjectId, required: true, ref: 'users' })
    adminUserId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true, refPath: 'userModel' })
    activeUserId: Types.ObjectId;

    @Prop({ type: String, required: true, enum: ["users", "clients"] })
    userModel: string;

    @Prop({ default: false })
    isActive: boolean;
}

export const ActiveUserSchema = SchemaFactory.createForClass(ActiveUser);
