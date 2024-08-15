import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

export class RegisterUserDto extends LoginUserDto{
    @Type()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @ApiProperty({default:"John"})
    firstname: string;

    @Type()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @ApiProperty({default:"Doe"})
    lastname: string;


}