import { Column, Entity, ManyToMany } from "typeorm";
import { CommonEntity } from "./Base.entity";
import { Category } from "./Category.entity";
import { ApiTags } from "@nestjs/swagger";
export type ProductKey = keyof Product;
@Entity()
export class Product extends CommonEntity{
    @Column()
    name: string;
    @Column({type:"float"})
    price: number;
    @Column()
    description: string;
    @Column()
    image:string;
    @ManyToMany(()=>Category,(category)=>category.products)
    categories: Category[];



}