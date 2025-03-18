import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Validate } from "class-validator";
import { SocialType } from "src/database/schemas/users";


export class signup_social {

    @ApiProperty({ description: "Enter your fcm access_token here", required: false })
    @IsString()
    @IsNotEmpty({ message: "token field is mandatory" })
    token: string;

    @ApiProperty({ description: "Enter here device type", required: false, enum: ['ANDROID', 'IOS', 'WEB'] })
    @IsString()
    @IsNotEmpty({ message: "device type field is mandatory" })
    device_type: string;

    @ApiProperty({ description: "Enter here social type", enum: Object.values(SocialType) })
    @IsString()
    @IsNotEmpty({ message: "device type field is mandatory" })
    social_type: string;

    @ApiProperty({ description: "Enter your fcm access_token here", required: false })
    @IsString()
    @IsOptional()
    fcm_token: string;

}