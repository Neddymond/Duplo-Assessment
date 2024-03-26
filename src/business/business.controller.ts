import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BusinessDTO } from 'src/dtos/business.dto';
import { BusinessService } from './business.service';
import { Helpers } from '../helpers/utility.helper';
import { ApiResponse } from 'src/interfaces/response.interface';
import { CreateBusinessValidatorPipe, CreateDepartmentHeadValidatorPipe } from './business.validation.pipe';
import { GetOrderDetailsValidatorPipe } from '../order/order.validation.pipe';
import { DepartmentHeadDTO } from 'src/dtos/department-head.dto';


@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
  ) { }

  @Get('/:businessId/credit-score')
  public async getBusinessCreditScore(@Param(new GetOrderDetailsValidatorPipe) params: any): Promise<ApiResponse> {
    try {
        const creditScore = await this.businessService.getBusinessCreditScore(params.businessId);
        return Helpers.sendJsonResponse(creditScore, 'Business credit score fetched successfully');
    } catch (error) {        
        return Helpers.sendErrorResponse({}, error.message, 'BAD_REQUEST')
    }
  }

  @Post()
  public async createBusiness(@Body(new CreateBusinessValidatorPipe()) data: BusinessDTO): Promise<ApiResponse> {
    try {
        const business = await this.businessService.createBusiness(data);
        console.log('business ---> ', business);
        return Helpers.sendJsonResponse(business, 'Business created successfully');
    } catch (error) {        
        return Helpers.sendErrorResponse({}, error.message, 'BAD_REQUEST')
    }
  }

  @Post('/dept-head')
  public async createDepartmentHead(@Body(new CreateDepartmentHeadValidatorPipe()) data: DepartmentHeadDTO): Promise<ApiResponse> {
    try {
        const departmentHead = await this.businessService.createDepartmentHead(data);
        console.log('business ---> ', departmentHead);
        return Helpers.sendJsonResponse(departmentHead, 'Department head created successfully');
    } catch (error) {        
        return Helpers.sendErrorResponse({}, error.message, 'BAD_REQUEST')
    }
  }
}