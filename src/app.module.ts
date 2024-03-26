import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { BusinessModule } from './business/business.module';
import { OrderModule } from './order/order.module';

console.log('envs ---> ', configService.getTypeOrmConfig());
console.log('envs ---> ', configService.getMongDbUrl());

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MongooseModule.forRoot(configService.getMongDbUrl()),
    BusinessModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
