import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, Matches } from "class-validator";

export class LoginUserDto {
    @Type()
    @IsEmail()
    @ApiProperty({default:"john.doe@example.com"})
    email: string;

    @Type()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)
    @ApiProperty({default:"Passw0rd!"})
    password: string;

}