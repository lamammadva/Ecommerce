import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { And, Between, ILike, In, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { FindProductParams } from "./product.types";
import { CreateProductDto } from "./dto/create-product.dto";
import { Injectable } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryService } from "src/category/category.service";


@Injectable()
export class ProductService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Product)
    private productRepo: Repository<Product>) { }

  async find(params?: FindProductParams) {
    
    let { where, select, relations, filter, pagination } = params || {};
    
    if (!where) where = {};
    if (filter) {
      if (filter.name) {
        where.name = ILike(`%${filter.name}%`);
      }
      if (filter.price) {
        const [min, max] = filter.price;
        let price = [];
        if (min > 0) {
          price.push(MoreThanOrEqual(min));
        }
        if (max > 0) {
          price.push(LessThanOrEqual(max));
        }
        if (price.length) {
          where.price = And(...price);
        }
      }
      if (filter.categories) {
        where.categories = filter.categories.map((categoryId) => {
          return {
            id: categoryId

          }
        })
      }
    }
    return this.productRepo.find({
      where,
      select,
      relations,
      take: pagination?.limit,
      skip: pagination && pagination.limit * pagination.page,
      order: {
        updatedAt: 'DESC',
      },
    });
  }
  async findOne(params?: FindProductParams) {
    let { where, select } = params || {}
    return this.productRepo.findOne({ where, select, relations: ['categories'] })


  }
  async create(body: CreateProductDto) {

    const categories = await this.categoryService.findByIds(body.categories)
    let product = this.productRepo.create({ ...body, categories: categories })
    await product.save()

    return product


  }
  async delete(params: number) {
    await this.productRepo.delete(params)
    return true


  }
  async update(id: number, body: UpdateProductDto) {
    const product = await this.findOne({ where: { id } })
    console.log(product);

    for (let key in body) {
      if (key === "categories") {
        product.categories = await this.categoryService.findByIds(body.categories)

      }
      else {
        product[key] = body[key]

      }

    }
    await product.save()
    return product

  }


}