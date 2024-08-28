import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./Base.entity";
import * as bcrypt from 'bcrypt'
import { Order } from "./Order.entity";
import { UserRoles } from "src/common/enum/user-roles.enum";

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

    @BeforeInsert()
    async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10)

    }
    @OneToMany(() => Order, (order) => order.user, { onDelete: "CASCADE" })
    orders: Order[]

}