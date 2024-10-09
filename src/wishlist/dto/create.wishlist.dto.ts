import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class createWishlistDto{
    @Type()
    @ApiProperty()
    @IsNumber()
    productId: number;
}