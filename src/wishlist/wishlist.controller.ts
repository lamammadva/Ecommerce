import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { wishlistService } from "./wishlist.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/entities/User.entity";
import { ClsService } from "nestjs-cls";


@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Wishlist')
export class wishlistController{
    constructor(private wishlistService: wishlistService,private cls:ClsService){

    }
    
    @Get('wishlist/:userId')
    getWishlist(@Param('userId') userId:number){
       
        return this.wishlistService.getWishlist(userId)
    }
    @Post('wishlist/:productId')
    createWishlist(@Param('productId') productId:number){
        return this.wishlistService.createWishlist(productId)
    }
}