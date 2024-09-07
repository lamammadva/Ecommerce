import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class ChangePassworDto{
    @Type()
    @IsString()
    @ApiProperty()
    password: string;

    @Type()
    @IsString()
    @ApiProperty()
    new_password: string;

    @Type()
    @IsEmail()
    @ApiProperty()
    email: string;
}