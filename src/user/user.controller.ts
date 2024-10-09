import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("User")
export class UserController {
    constructor(
        private userService: UserService,
    ){}
    @Get()
    list(){
        return this.userService.find()
    }
    @Get(':id')
    getUser(@Param('id') id:number){
        return this.userService.findOne({id})
    }
}
