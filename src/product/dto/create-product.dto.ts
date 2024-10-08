import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min, MinLength } from "class-validator";


export class CreateProductDto {
    @Type()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty()
    name: string

    @Type()
    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number

    @Type()
    @IsString()
    @MaxLength(500)
    @ApiProperty()
    @IsOptional()
    description: string


    @Type()
    @IsString()
    @ApiProperty()
    @IsUrl()
    image: string

    @Type()
    @IsNumber({}, { each: true })
    @ApiProperty({ type: Number, isArray: true })
    @IsOptional()
    categories: number[];
  
   


}