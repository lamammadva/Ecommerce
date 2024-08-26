import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags("Category")
export class CategoryController {
    constructor(private categoryService:CategoryService){}

    @Get()
    list(){
        return this.categoryService.find();
    }
    @Get(":id")
    item(@Param('id')  id:number){
        return this.categoryService.findOne({where:{id},relations:["products"]})
    }

    @Post()
    create(@Body() body: CreateCategoryDto){
        return this.categoryService.create(body)
    }
    @Delete(":id")
    delete(@Param('id') id:number){
        return this.categoryService.delete(id)
    }
    @Post(":id")
    update(@Param("id") id:number ,@Body() body:CreateCategoryDto){
        return this.categoryService.update(id,body)
    }



    



}
