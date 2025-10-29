import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({ timestamps: true, _id: false })
export class Password {
    @Prop({ required: true })
    password: string;
}

@Schema({ _id: false })
export class PageInfo {
    @Prop()
    organizationUrn: string;

    @Prop()
    organizationId: string;

    @Prop({ default: null })
    name: string;

    @Prop()
    followers: string;

    @Prop({ default: "" })
    page_access_token: string;

    @Prop({ default: null })
    logo: string;

    @Prop({ default: null })
    role: string;

    @Prop({ default: "APPROVED" })
    state: string;

    @Prop({ default: Date.now })
    lastFetched: Date;
}

@Schema({ _id: false })
export class PageListInfo {
    @Prop()
    organizationUrn: string;

    @Prop()
    organizationId: string;

    @Prop({ default: null })
    name: string;

    @Prop({ default: null })
    logo: string;

    @Prop({ default: "" })
    followers: string;

    @Prop({ default: null })
    role: string;

    @Prop({ default: null })
    state: string;

    @Prop({ default: Date.now })
    lastFetched: Date;
}

@Schema({ _id: false })
export class UserPlatform {
    @Prop({ default: null })
    linkedinId: string;

    @Prop({ default: null })
    email: string;

    @Prop({ default: null })
    lastName: string;

    @Prop({ default: null })
    picture: string;

    @Prop({ type: PageInfo })
    business: PageInfo;

    @Prop({ type: [PageListInfo] })
    bussinessList: PageListInfo[];

    @Prop({ default: null })
    platformName: string;

    @Prop({ default: null })
    accessToken: string;

    @Prop({ default: null })
    name: string;

    @Prop({ default: null })
    lastLogin: string;

    @Prop({ default: null })
    uniqueId: string;
}

@Schema({ _id: false })
export class RecoveryEmail {
    @Prop({ default: "" })
    email: string;

    @Prop({ default: false })
    verified: boolean;
}

@Schema({ _id: false })
export class Country {
    @Prop()
    name: string;

    @Prop()
    code: string;
}

@Schema({ _id: false })
export class ClientDetail {
    @Prop({ default: null })
    id: string;

    @Prop({ default: null })
    name: string;
}

@Schema({ _id: false })
export class PaymentData {
    @Prop()
    status: string;

    @Prop()
    invoiceURL: string;
}

@Schema({ _id: false })
export class PaymentDetail {
    @Prop({ default: null })
    subscriptionId: string;

    @Prop({ default: null })
    customerId: string;

    @Prop({ type: [PaymentData] })
    paymentData: PaymentData[];
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    razorpayCustomerId: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ type: Types.ObjectId, ref: 'packages' })
    packageId: Types.ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ type: Password })
    passwordDetail: Password;

    @Prop({ type: RecoveryEmail })
    recoveryEmail: RecoveryEmail;

    @Prop({ default: "30min" })
    sessionTimeOut: string;

    @Prop({ enum: [0, 1, 2, 3], default: 0 })
    authSteps: number;

    @Prop({ enum: [0, 1], default: 0 })
    role: number;

    @Prop({ type: Country })
    country: Country;

    @Prop({ default: null })
    phone: string;

    @Prop({ default: null })
    avatar: string;

    @Prop({ type: ClientDetail })
    clientDetail: ClientDetail;

    @Prop({ enum: [0, 1, 2], default: null })
    planTypes: number;

    @Prop({ default: "" })
    planType: string;

    @Prop({ default: null })
    clientDomain: string;

    @Prop({ default: null })
    planDuration: string;

    @Prop({ default: true })
    freeTrial: boolean;

    @Prop({ default: "" })
    authOtp: string;

    @Prop({ default: null })
    otpExp: Date;

    @Prop({ default: 7 })
    freeTrialDays: number;

    @Prop({ default: false })
    twoFactorAuth: boolean;

    @Prop({ default: "" })
    authToken: string;

    @Prop({ default: "" })
    deviceToken: string;

    @Prop({ default: false })
    terms: boolean;

    @Prop({ default: false })
    receiveNews: boolean;

    @Prop({ type: [String] })
    oldEmail: string[];

    @Prop({ type: PaymentDetail })
    paymentDetail: PaymentDetail;

    @Prop({ type: [UserPlatform] })
    platforms: UserPlatform[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add index for platforms
UserSchema.index({ "platforms.uniqueId": 1, "platforms.platformName": 1 });