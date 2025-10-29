import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
    @Prop({ required: true })
    clientName: string;

    @Prop({ required: true })
    roleName: string;

    @Prop({ type: [String] })
    permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);