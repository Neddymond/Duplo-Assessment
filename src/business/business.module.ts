import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Business } from 'src/business/models/business.entity';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { DepartmentHead } from 'src/business/models/department-head.entity';
import { AccountSchema } from 'src/order/schemas/account.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([Business, DepartmentHead]),
        MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema },])
    ],
    providers: [BusinessService],
    controllers: [BusinessController],
    exports: [BusinessService]
})
export class BusinessModule {}
