import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { Repository } from "typeorm";
export type UserKey = keyof User;

export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo:Repository<User>){}
        
        
        
        
    find(where?:Partial<User>){
        return this.userRepo.find();
    }
    findOne(where:Partial<User>,select?:UserKey[]){
        return this.userRepo.findOne({where,select});
    }
    
    

}