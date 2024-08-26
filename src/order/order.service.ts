import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entities/Order.entity";
import { In, Repository } from "typeorm";
import { FindOrderParams } from "./order.type";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ProductService } from "src/product/product.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {
    constructor(
        private productService: ProductService,
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
    ) {
    }
    find(params?: FindOrderParams) {
        let { where, select, relations } = params || {}
        return this.orderRepo.find({ where, select, relations })
    }
    findOne(params?: FindOrderParams) {
        let { where, select, relations } = params || {}
        return this.orderRepo.findOne({ where, select, relations })
    }
    async create(body: CreateOrderDto) {
        let productIds: number[] = body.items.map((item) => item.productId);

        let products = await this.productService.find({where: {id: In(productIds)}
        
            
        });
      
    
        console.log(products);
        
        let totalPrice = 0
        for (let product of products) {
            totalPrice += product.price
        }



        let items = products.map((product) => {
            return {
                price: product.price,
                product,
            };
        });


        const order = this.orderRepo.create({ ...body,totalPrice, items })
        await order.save()
        return order
    }
}