import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum UserType {
    ADMIN = 'ADMIN',
    USER = 'USER',
    AI_AGENT = 'AI_AGENT',
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export enum SocialType {
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE',
}

export enum AccountStatus {
    ACTIVATED = 'ACTIVATED',
    DEACTIVATED = 'DEACTIVATED',
}


export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {

    @Prop({ default: null, index: true })
    name: string;

    // stripe cus_id
    @Prop({ default: null, index: true })
    stripe_cus_id: string;

    @Prop({ default: UserType.USER, enum: UserType, })
    user_type: string;

    @Prop({ default: 0, enum: [0, 1, 2, 3] }) //1:user, 2:admin
    login_try: number;

    @Prop({ default: false }) //1:user, 2:admin
    new_pass_mail_sent: boolean;

    @Prop({ default: null, index: true })
    email: string;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    })
    location: { type: string; coordinates: number[] };

    @Prop({ default: null, index: true })
    sub_id: string;

    @Prop({ default: null })
    temp_email: string;

    @Prop({ default: null })
    profile_pic: string;

    @Prop({ default: null })
    password: string;

    @Prop({ default: null })
    phone_number: string;

    @Prop({ default: null })
    temp_phone_number: string;

    @Prop({ default: null })
    country_code: string;

    @Prop({ default: null })
    nation_code: string;

    @Prop({ default: null })
    email_otp: string;

    @Prop({ default: null })
    temp_email_otp: string;

    @Prop({ default: null })
    unique_code: string;

    @Prop({ default: null })
    email_otp_generated_at: number;

    @Prop({ default: null })
    phone_otp: string;

    @Prop({ default: null })
    phone_otp_generated_at: number;

    @Prop({ default: false })
    is_email_verified: boolean;

    @Prop({ default: false })
    is_phone_verified: boolean;

    @Prop({ default: false })
    two_step_verification: boolean;

    @Prop({ default: null })
    dob: Date;

    @Prop({ default: Gender.MALE, enum: Gender })
    gender: string;

    @Prop({ default: null, enum: SocialType })
    social_type: string;

    @Prop({ default: null })
    social_id: string;

    @Prop({ default: false })
    social_login: boolean;

    @Prop({ default: false })
    is_blocked: boolean = false;

    @Prop({ default: false })
    is_deleted: boolean;

    @Prop({ default: false })
    is_outside_user: boolean;

    @Prop({ default: AccountStatus.ACTIVATED, enum: AccountStatus })
    account_status: String;

    @Prop({ default: null })
    password_updated_at: number;

    @Prop({ default: false })
    super_admin: boolean;

    @Prop([{ type: String, default: null }])
    roles: string[];

    @Prop({ default: false })
    dark_theme: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: null })
    created_at: number;

    @Prop({ default: null })
    updated_at: number = null;

}

export const UserSchema = SchemaFactory.createForClass(Users);
UserSchema.index({ location: '2dsphere' });