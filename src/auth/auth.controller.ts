import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ForgetPaswordDto } from "./dto/forget_password.dto";
import { ResetPasswordDto } from "./dto/reset_password.dto";

@Controller('auth')
@ApiTags('Auth')
export class AuthController{
    constructor(
        private authService:AuthService
    ){}
    @Post('/login')
    login( @Body() body:LoginUserDto){
        return this.authService.login(body)
       
    }
    @Post('register')
    register(
        @Body() body:RegisterUserDto
        
        ){
        return this.authService.register(body)
    }
    @Get('/forget_password')
    get_forget_password(){
        return this.authService.

    }

    @Post('/forget_password')
    forget_password(@Body() body:ForgetPaswordDto){
        return this.authService.forget_password(body)
    }

    @Post('reset_password')
    reset_password(@Body() body:ResetPasswordDto){
        return this.authService.reset_password(body)
    }


}