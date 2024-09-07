import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, Matches, isNumber } from "class-validator";

export class LoginUserDto {
    @Type()
    @IsEmail()
    @ApiProperty({default:"john.doe@example.com"})
    email: string;

    @Type()
    @IsString()
    @ApiProperty({default:"Passw0rd!"})
    password: string;

}