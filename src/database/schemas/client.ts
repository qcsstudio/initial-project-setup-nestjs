import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({ _id: false })
export class AdminUser {
    @Prop({ default: null })
    id: string;

    @Prop({ default: null })
    name: string;

    @Prop({ default: "admin" })
    role: string;

    @Prop({ default: null })
    avatar: string;

    @Prop({ default: null })
    email: string;
}

@Schema({ _id: false })
export class Platform {
    @Prop({ default: null })
    platformName: string;

    @Prop({ default: null })
    userName: string;

    @Prop({ default: null })
    uniqueId: string;

    @Prop({ default: null })
    avatar: string;

    @Prop({ default: null })
    accountType: string;

    @Prop({ default: null })
    accessToken: string;

    @Prop({ default: true })
    show: boolean;
}

@Schema({ _id: false })
export class ClientUser {
    @Prop({ default: null })
    id: string;

    @Prop({ default: null })
    name: string;

    @Prop({ default: null })
    role: string;

    @Prop({ default: null })
    avatar: string;

    @Prop({ default: null })
    email: string;
}

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
    @Prop({ required: true })
    clientName: string;

    @Prop({ type: Types.ObjectId, ref: 'user' })
    adminUserId: Types.ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: "single" })
    planType: string;

    @Prop({ default: null })
    clientDomain: string;

    @Prop({ default: null })
    planDuration: Date;

    @Prop({ default: true })
    freeTrial: boolean;

    @Prop({ default: 7 })
    freeTrialDays: number;

    @Prop({ type: AdminUser })
    adminUser: AdminUser;

    @Prop({ type: [Platform] })
    platforms: Platform[];

    @Prop({ type: [ClientUser] })
    users: ClientUser[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);