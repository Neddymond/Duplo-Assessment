import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Business } from '../../business/models/business.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {

    @Column()
    reference_id: string;

    @Column()
    source_name: string;

    @ManyToOne(() => Business, (business) => business.orders)
    business: Business

    @Column()
    quantity: number;

    @Column()
    item_type: string;

    @Column("simple-json")
    total_money: { amount: number; currency: string }

    @Column("simple-json")
    total_discount_money: { amount: number; currency: string }
}

