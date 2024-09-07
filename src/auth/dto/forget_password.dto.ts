import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class ForgetPaswordDto{
    @Type()
    @IsString()
    @ApiProperty({default:"_____@gmail.com"})
    email:string
}