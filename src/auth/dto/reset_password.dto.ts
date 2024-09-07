import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";

export class ResetPasswordDto{
    @Type()
    @IsString()
    @ApiProperty()
    password: string;
    @Type()
    @IsString()
    @ApiProperty()
    confirm_password: string;
    @Type()
    @IsEmail()
    @ApiProperty()
    email: string;
    @Type()
    @IsString()
    @Length(10)
    @ApiProperty()
    token: string;


}