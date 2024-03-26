import { Controller, Post, Body, Request, Req, Get, Put, Patch, Param, Query, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { OrderDTO } from 'src/dtos/order.dto';
import { OrderService } from './order.service';
import { Helpers } from '../helpers/utility.helper';
import { ApiResponse } from 'src/interfaces/response.interface';
import { CreateOrderValidatorPipe, GetOrderDetailsValidatorPipe } from './order.validation.pipe';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Get('/details/:businessId')
    public async getOrderDetails(@Param(new GetOrderDetailsValidatorPipe()) params: any): Promise<ApiResponse> {
        try {
          const orderDetails = await this.orderService.getOrderDetails(params.businessId);
          return Helpers.sendJsonResponse(orderDetails, 'Order details fetched successfully');
        } catch (error) {
            return Helpers.sendErrorResponse({}, error.message, 'BAD_REQUEST')
        }
    }

    @Post()
    public async createOrder(@Body(new CreateOrderValidatorPipe()) data: OrderDTO): Promise<ApiResponse> {
        try {
          const order = await this.orderService.createOrder(data);
          console.log('order ---> ', order);
          return Helpers.sendJsonResponse(order, 'Order created successfully');
        } catch (error) {
            return Helpers.sendErrorResponse({}, error.message, 'BAD_REQUEST')
        }
    }
}
