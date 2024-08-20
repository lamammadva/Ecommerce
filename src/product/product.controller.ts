import { Body, Controller, Delete, Get, Injectable, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/entities/Product.entity';
@Injectable()
@Controller('product')
@ApiTags("Product")
export class ProductController {
    constructor(private productService:ProductService){}
    
    @Get()
    find(){
        return this.productService.find()

    }
    @Get(":id")
    findOne(@Param('id') id:number){
        return this.productService.findOne({where:{id}})

    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() body:CreateProductDto):Promise<Product>{
        return this.productService.create(body)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(":id")
    delete(@Param('id') id:number ){
        return this.productService.delete(id)

    }
    @ApiBearerAuth()
    @ApiOperation({summary:"update product"})
    @UseGuards(AuthGuard)
    @Post(":id")
    update(@Param('id') id:number, @Body() body:UpdateProductDto){
        return this.productService.update(id,body)

    }

    



}
