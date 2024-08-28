import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from 'src/common/enum/user-roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';

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
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRoles.ADMIN,UserRoles.CONTENT_MANAGER)

    create(@Body() body: CreateCategoryDto){
        return this.categoryService.create(body)
    }



    @Delete(":id")
    @UseGuards(AuthGuard)
    @Roles(UserRoles.ADMIN,UserRoles.CONTENT_MANAGER)

    delete(@Param('id') id:number){
        return this.categoryService.delete(id)
    }



    @Post(":id")
    @UseGuards(AuthGuard)
    @Roles(UserRoles.ADMIN,UserRoles.CONTENT_MANAGER)

    update(@Param("id") id:number ,@Body() body:CreateCategoryDto){
        return this.categoryService.update(id,body)
    }



    



}
