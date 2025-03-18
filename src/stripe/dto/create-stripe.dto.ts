import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateStripeDto { }


export class subscription {
    @ApiProperty()
    @IsString()
    plan_id: string;

    @ApiProperty()
    @IsString()
    payment_method_id: string;

}

export class upgradeSubscription {
    @ApiProperty()
    @IsString()
    plan_id: string;

}

export class Id {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty({ message: "id param is mandatory" })
    id: string;
}