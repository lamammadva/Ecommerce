import { Column, ManyToMany } from "typeorm";
import { CommonEntity } from "./Base.entity";
import { Category } from "./Category.entity";

export class Product extends CommonEntity{
    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    description: string;
    @Column()
    image:string;
    @ManyToMany(()=>Category,(category)=>category.products)
    categories: Category[];



}