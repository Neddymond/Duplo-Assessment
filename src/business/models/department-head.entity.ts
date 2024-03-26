import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Business } from './business.entity';

@Entity({ name: 'department_head' })
export class DepartmentHead extends BaseEntity {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @ManyToOne(() => Business, (business) => business.departmentHeads)
    business: Business
}