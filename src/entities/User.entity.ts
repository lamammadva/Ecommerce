import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./Base.entity";

@Entity()
export class User extends BaseEntity{
    @Column()
    email:string;
    
    @Column({select:false})
    password:string;

    @Column()
    firstname:string;

    @Column()
    lastname:string;
}