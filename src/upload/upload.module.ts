import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageEntity } from "src/entities/Image.entity";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { MulterModule } from "@nestjs/platform-express";


@Module({
    imports:[TypeOrmModule.forFeature([ImageEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../uploads'),
        filename: (req, file, callback) => {
          callback(
            null,
            `${Date.now()}${extname(file.originalname).toLowerCase()}`,
          );
        },
      }),
    }),
  ],
    controllers: [UploadController],
    providers:[UploadService],
  })
export class UploadModule{}