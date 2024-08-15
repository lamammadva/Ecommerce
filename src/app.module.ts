import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { ProfileModule } from './auth/profile/profile.module';

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
      logging:true
      }),
    
    UserModule,AuthModule,ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
