import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './models/business.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusinessDTO } from 'src/dtos/business.dto';
import { DepartmentHeadDTO } from 'src/dtos/department-head.dto';
import { DepartmentHead } from 'src/business/models/department-head.entity';
import { Account } from 'src/order/schemas/account.schema';

@Injectable()
export class BusinessService {
    constructor(
        @InjectRepository(Business) private readonly business: Repository<Business>,
        @InjectRepository(DepartmentHead) private readonly departmentHead: Repository<DepartmentHead>,
        @InjectModel('Account') private account: Model<Account>,
    ) { }

    async createBusiness(data: BusinessDTO): Promise<Business> {        
        const business = this.business.create(data);
        return this.business.save(business);
    }
    
    async createDepartmentHead(data: DepartmentHeadDTO): Promise<DepartmentHead> {        
        const departmentHead = this.departmentHead.create(data);
        return this.departmentHead.save(departmentHead);
    }z

    async getBusinessCreditScore(businessId: string): Promise<any> {
        const business = await this.account.findOne({ business: businessId }).lean().exec();
        if (!business) {
            throw new NotFoundException('business does not exist');
        }

        // random values
        let creditScore = 0;
        if (business.debt < 50000) {
            creditScore += 25;
        }
        if (business.revenue > 1000000) {
            creditScore += 30;
        }
        if (business.credit > 50000) {
            creditScore += 25;
        }

        return creditScore;
    }
}
