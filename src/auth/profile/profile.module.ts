import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { User } from "src/entities/User.entity";


@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[ProfileController],
    providers:[ProfileService],
})

export class ProfileModule  {}