import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Business } from 'src/business/models/business.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from 'src/order/models/order.entity';
import { OrderTransactionSchema } from './schemas/order-transaction.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, Business]),
        MongooseModule.forFeature([{ name: 'OrderTransaction', schema: OrderTransactionSchema },])
    ],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService]
})
export class OrderModule {}
