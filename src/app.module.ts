import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { ProfileModule } from './auth/profile/profile.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { MulterModule } from '@nestjs/platform-express';
import {join} from 'path';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: +config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities:[`${__dirname}/**/*.entity.{ts,js}`],//herdefe entity filelarini import etmek istemirikse bu formada yazilir
      synchronize: true,
      migrations:[`${__dirname}/**/migrations/*.js`],
      migrationsRun:true,
      logging:true
      }),
      // ServeStaticModule.forRoot({
      //   rootPath: join(__dirname, '..', 'client'),
      // }),


      MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'lemanb.memmedova@gmail.com',
            pass: "qxigqrpcggcfvskx",
          },
        },
        
       
      }),
    UserModule,AuthModule,ProfileModule, ProductModule, CategoryModule,OrderModule,UploadModule
      
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
