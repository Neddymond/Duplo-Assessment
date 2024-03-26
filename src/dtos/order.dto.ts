import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { Business } from 'src/business/models/business.entity';

interface Money {
    amount: number,
    currency: string
}

export class OrderDTO {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string

    @ApiProperty()
    @IsString()
    reference_id: string

    @ApiProperty({ required: true })
    @IsString()
    source_name: string

    @ApiProperty({ required: true })
    @IsString()
    business: Business

    @ApiProperty({ required: true })
    @IsNumber()
    quantity: number

    @ApiProperty({ required: true })
    @IsArray()
    item_type: string

    @ApiProperty({ required: true })
    @IsObject()
    total_money: Money
    
    @ApiProperty({ required: true })
    @IsObject()
    total_discount_money: Money
}

export interface GetOrderDetails {
    orders: OrderDTO[]
    totalOrders: number,
    totalAmount: number,
    todayOrders: number,
    todayAmount: number
}