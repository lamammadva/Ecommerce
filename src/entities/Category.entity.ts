import { Column, ManyToMany } from "typeorm";
import { CommonEntity } from "./Base.entity";
import { Product } from "./Product.entity";

export class Category extends CommonEntity{
    @Column()
    name: string;
    @ManyToMany(()=>Product,(product)=>product.categories)
    products: Product[];

}