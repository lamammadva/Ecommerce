import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "src/entities/Image.entity";
import { Repository } from "typeorm";

@Injectable()
export class UploadService{
    constructor(
        @InjectRepository(ImageEntity)
        private imageRepo: Repository<ImageEntity>
    ){}
    uploadImage(
        file: Express.Multer.File,
        userId: number
    ){
        return file.filename
    }
}