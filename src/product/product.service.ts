import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Repository } from "typeorm";
import { FindProductParams } from "./product.types";
import { CreateProductDto } from "./dto/create-product.dto";
import { Injectable } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryService } from "src/category/category.service";


@Injectable()
export class ProductService{
    constructor(
        private categoryService:CategoryService,
        @InjectRepository(Product)
        private productRepo:Repository<Product>){}

    find(params?:FindProductParams){
        let {where,select} = params || {}
        return this.productRepo.find({where,select,relations:['categories']})

        
    }
    findOne(params?:FindProductParams){
        let {where,select} = params || {}
        return this.productRepo.findOne({where,select,relations:['categories']})


    }
    async create(body:CreateProductDto){
        
        const categories =  await this.categoryService.findByIds(body.categories)
        console.log(categories);
        let product =  this.productRepo.create({...body,categories:categories})
        await product.save()
        
        return product


    }
    async delete(params:number){
        await  this.productRepo.delete(params)
        return true


    }
    async update(id:number,body:UpdateProductDto){
        const product = await this.findOne({where:{id}})
        console.log(product);
        
        for (let key in body){
            if(key === "categories"){
                product.categories = await this.categoryService.findByIds(body.categories)

            }
            else{
                product[key] = body[key]

            }

        }
        await product.save()
        return product

    }
        
        
}