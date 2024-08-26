import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("order")
@ApiTags("Order")
@ApiBearerAuth()
export class OrderController{
    constructor(private orderService:OrderService){}

    @Get()
    find(){
        return this.orderService.find({relations: ['items', 'items.product'],})
    }
    @Get(':id')
    findOne(@Param("id") id: number ){
        return this.orderService.findOne({where:{id}})
    }
    @Post()
    create(@Body() body:CreateOrderDto){
        return this.orderService.create(body)
    }


}