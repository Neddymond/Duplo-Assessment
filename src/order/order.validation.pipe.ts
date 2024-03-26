import { PipeTransform, BadRequestException } from '@nestjs/common';
import { OrderDTO } from 'src/dtos/order.dto';
import { createOrderSchema, getOrderDetailsSchema } from 'src/validation-schemas/order.schema';

export class CreateOrderValidatorPipe implements PipeTransform<OrderDTO> {
  public transform(value: OrderDTO): OrderDTO {
    const result = createOrderSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class GetOrderDetailsValidatorPipe implements PipeTransform<OrderDTO> {
  public transform(value: OrderDTO): OrderDTO {
    const result = getOrderDetailsSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}