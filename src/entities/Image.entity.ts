import { Injectable } from "@nestjs/common";
import { CommonEntity } from "./Base.entity";
@Injectable()
export class ImageEntity extends CommonEntity{
    url:string
}