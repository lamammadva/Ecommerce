import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";
import { FindOptionsWhere, Repository } from "typeorm";
export type UserKey = keyof User;

@Injectable()//servisleri tanisin deye yazilir
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo:Repository<User>){}
        
        
        
        
    find(where?:Partial<User>){
        return this.userRepo.find();
    }
    findOne(where:FindOptionsWhere<User>,select?:UserKey[]){
        return this.userRepo.findOne({where,select});
    }
    async create(params:Partial<User>){
        let checkUser = await this.findOne({email:params.email})
        if(checkUser){
            throw new ConflictException('User already exists')
        }
        let user = this.userRepo.create(params)
        await  user.save()
        return user

    }
    
    

}