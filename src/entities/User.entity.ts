import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {  CommonEntity } from "./Base.entity";
import  * as bcrypt  from 'bcrypt'

@Entity()
export class User extends CommonEntity{
    @Column({unique:true})
    email:string;
    
    @Column({select:false})
    password:string;

    @Column()
    firstname:string;

    @Column()
    lastname:string;
    
    @BeforeInsert()
     async beforeInsert(){
        this.password= await bcrypt.hash(this.password,10)

    }

}