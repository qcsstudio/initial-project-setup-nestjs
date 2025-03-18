import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export enum RaceType {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export enum EventType {
    TRAIL = 'TRAIL',
    MARATHON = 'MARATHON',
    SOLO = 'SOLO',
}

export enum RaceStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export enum GenderPreference {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}


export type RaceDocument = HydratedDocument<Race>;

@Schema({ timestamps: true })
export class Race {

    @Prop({ type: Types.ObjectId, ref: 'users', required: false })
    created_by: Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    destination_banner: string;


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
    start_location: { type: string; coordinates: number[] };

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
    end_location: { type: string; coordinates: number[] };


    @Prop({
        type: String,
        enum: RaceType,
        default: RaceType.PUBLIC,
    })
    race_type: string;

    @Prop({
        type: String,
        enum: EventType,
        required: true,
        default: EventType.SOLO
    })
    event_type: string;

    @Prop({ type: Number, default: 20 })
    max_participants: number;

    @Prop({ type: Number, default: 3 })
    min_participants: number;

    @Prop({ type: Boolean, default: false })
    is_scheduled: false;

    @Prop({ type: Date })
    start_time: Date;

    @Prop({ type: Date })
    end_time: Date;

    @Prop({ default: 0 })
    total_distance: number = 0;

    @Prop({
        type: String,
        enum: RaceStatus,
        default: RaceStatus.PENDING,
    })
    race_status: string;

    @Prop({
        type: String,
        enum: GenderPreference,
        default: GenderPreference.MALE,
    })
    gender_preference: string;

    @Prop({ type: Boolean, default: false })
    has_bots: boolean;

    @Prop({
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: null,
    })
    bot_difficulty: string;
}

export const RaceSchema = SchemaFactory.createForClass(Race);