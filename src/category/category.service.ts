import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/Category.entity";
import { In, Repository } from "typeorm";
import { FindCategoryParams } from "./category.types";
import { Body, Injectable, Param } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepo:Repository<Category> ) {}

    find(params?:FindCategoryParams){
        let {where,select} = params || {}
        return this.categoryRepo.find({where,select});



    }
    findOne(params?:FindCategoryParams){
        let {where,select} = params || {}
        return this.categoryRepo.findOne({where,select});
    }
    findByIds(ids:number[]){
        return this.categoryRepo.find({where:{id:In(ids)},select:["id","name"]})


    }

 
    

    async create(body: CreateCategoryDto){
        let category =  this.categoryRepo.create(body);
        await category.save();
        return category

        

    }
    async delete(id: number){
        await this.categoryRepo.delete(id);
        return true

    }
    async update(id:number,body:CreateCategoryDto){
        let category = await this.findOne({where:{id}})
        console.log(category);
        for (let key in body){
            console.log(key);
            
            category[key] = body[key]
        }
        // Object.assign(category, body);
        await category.save()
        return category

    }


}