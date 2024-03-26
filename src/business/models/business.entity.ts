import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { DepartmentHead } from './department-head.entity';
import { Order } from '../../order/models/order.entity';

@Entity({ name: 'business' })
export class Business extends BaseEntity {

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    type: string;

    @OneToMany(() => DepartmentHead, (departmentHeads) => departmentHeads.business)
    departmentHeads: DepartmentHead[];

    @OneToMany(() => DepartmentHead, (orders) => orders.business)
    orders: Order[];
}
