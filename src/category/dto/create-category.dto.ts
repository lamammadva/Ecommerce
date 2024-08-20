import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @Type()
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

  
}