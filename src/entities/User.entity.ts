import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./Base.entity";
import * as bcrypt from 'bcrypt'
import { Order } from "./Order.entity";
import { UserRoles } from "src/common/enum/user-roles.enum";
import { WishlistEntity } from "./wishlist.entity";

@Entity()
export class User extends CommonEntity {
    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstname: string;

    @Column({
        type: 'enum',
        enum: UserRoles,
        array: true,
        nullable: true
    })
    roles: UserRoles[]

    @Column()
    lastname: string;

    @Column({nullable: true})
    activateToken: string;
    
    @Column({nullable: true})
    activateExpire:Date;


   
    @OneToOne(()=>WishlistEntity ,(wishlist) => wishlist.user)
    wishlist:WishlistEntity[]
    
    @BeforeInsert()
    beforeInsert() {
        this.password =  bcrypt.hashSync(this.password, 10)

    }
    @OneToMany(() => Order, (order) => order.user, { onDelete: "CASCADE" })
    orders: Order[]
    
    get fullName(){
        return `${this.firstname} ${this.lastname}`
    }
}