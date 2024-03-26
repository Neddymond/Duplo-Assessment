import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './models/order.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto'
import { Business } from '../business/models/business.entity';
import { OrderTransaction } from './schemas/order-transaction.schema';
import { GetOrderDetails, OrderDTO } from 'src/dtos/order.dto';
import { Helpers } from 'src/helpers/utility.helper';
import { configService } from '../config/config.service';
import source from 'ormconfig';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private readonly order: Repository<Order>,
        @InjectRepository(Business) private readonly business: Repository<Business>,
        @InjectModel('OrderTransaction') private orderTransaction: Model<OrderTransaction>,
    ) { }

    async createOrder(data: OrderDTO): Promise<Order> {
        const business = await this.business.findOne({ where: { id: String(data.business) } });
        if (!business) {
            throw new NotFoundException('Business provided does not exist');
        }

        const reference_id = `order-${crypto.randomUUID()}`;
        const transactionId = `tx-${crypto.randomUUID()}`
        const taxUrl = configService.getValue('TAX_URL');

        // log tax
        const taxPayload = {
            amount: data.total_money.amount,
            fullName: business.name,
            address: business.location
        }
        const taxData = await Helpers.post(taxUrl, JSON.stringify(taxPayload));
        const parsedTaxData = JSON.parse(taxData.replace( /\,(?!\s*?[\{\[\"\'\w])/g, ''));
        const vat = parsedTaxData.vat.split('%')[0]

        // create order
        data.reference_id = reference_id;
        const order = this.order.create(data);
        const orderDetails = await this.order.save(order);

        // log tx data
        const taxAmount = Helpers.calculateTaxPercentage(Number(data.total_money.amount) / 100, Number(vat));
        const txPayload = {
            transactionId,
            taxAmount,
            amount: orderDetails.total_money.amount,
            currency: orderDetails.total_money.currency,
            category: orderDetails.item_type,
            paymentChannel: orderDetails.source_name,
            business: { id: business.id, name: business.name },
            location: business.location
        }
        await this.orderTransaction.create(txPayload);

        return orderDetails
    }

    async getOrderDetails(businessId: string): Promise<GetOrderDetails> {        
        const business = await this.business.findOne({ where: { id: businessId } });
        const today = new Date().toISOString().split('T')[0];
        if (!business) {
            throw new NotFoundException('business does not exist');
        }

        const queryRunner = source.createQueryRunner();       
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const [totalOrdersQueryResult, todayOrdersQueryResult, totalAmountQueryResult, todayAmountQueryResult, orders] = await Promise.all([
                this.order.createQueryBuilder('order')
                    .select('COUNT(*)', 'totalOrders')
                    .where("order.business = :business", { business: businessId })
                    .getRawOne(),
      
                this.order.createQueryBuilder('order')
                    .select('COUNT(*)', 'todayOrders')
                    .where("DATE(order.created_at) = :today", { today: today })
                    .andWhere("order.business = :business", { business: businessId })
                    .getRawOne(),
        
                this.order.createQueryBuilder('order')
                    .select("SUM(cast(total_money::json ->> 'amount' as integer)) / 100", 'totalAmount')
                    .where("order.business = :business", { business: businessId })
                    .getRawOne(),
        
                this.order.createQueryBuilder('order')
                    .select("SUM(cast(total_money::json ->> 'amount' as integer)) / 100", 'todayAmount')
                    .where("DATE(order.created_at) = :today", { today: today })
                    .andWhere("order.business = :business", { business: businessId })
                    .getRawOne(),
        
                this.order.find()
            ]);

            const totalOrders = parseInt(totalOrdersQueryResult.totalOrders, 10) || 0;
            const todayOrders = parseInt(todayOrdersQueryResult.todayOrders, 10) || 0;
            const totalAmount = parseFloat(totalAmountQueryResult.totalAmount) || 0;
            const todayAmount = parseFloat(todayAmountQueryResult.todayAmount) || 0;
      
            await queryRunner.commitTransaction();
            
            return { totalOrders, todayOrders, totalAmount, todayAmount, orders };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
