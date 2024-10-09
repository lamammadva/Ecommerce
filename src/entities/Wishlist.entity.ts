import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { CommonEntity } from "./Base.entity";
import { Product } from "./Product.entity";
import { User } from "./User.entity";
@Entity()
export class WishlistEntity extends CommonEntity{
    @ManyToMany(()=>Product, product => product.wishlist,{onDelete:'CASCADE'})
    @JoinTable()
    products: Product[]

    @OneToOne(()=>User, user => user.wishlist , {onDelete:'CASCADE'})
    @JoinColumn()
    user: User

}