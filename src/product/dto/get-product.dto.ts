import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString, isArray, isNumber } from "class-validator";

export class GetProductDto {
    @Type()
    @IsString()
    @ApiProperty({ required: false })
    @IsOptional()
    name: string;
    @Type()
    @IsNumber()
    @ApiProperty({ required: false })
    @IsOptional()
    maxPrice: number;
    @Type()
    @IsNumber()
    @ApiProperty({ required: false })
    @IsOptional()
    minPrice: number;

    @Type()
    @IsOptional()
    @ApiProperty({ type: String, required: false })
    @Transform(({ value }) => value?.split(','))
    categories: number[];

    @Type()
    @IsOptional()
    @ApiProperty({ required: false, default: 5 })
    @IsNumber()
    limit: number;

    @Type()
    @IsOptional()
    @ApiProperty({ required: false, default: 0 })
    @IsNumber()
    page: number;
}
