import { PipeTransform, BadRequestException } from '@nestjs/common';
import { DepartmentHeadDTO } from 'src/dtos/department-head.dto';
import { createDepartmentHeadSchema } from 'src/validation-schemas/department-head.schema';
import { BusinessDTO } from '../dtos/business.dto';
import { createBusinessSchema } from '../validation-schemas/business.schema';

export class CreateBusinessValidatorPipe implements PipeTransform<BusinessDTO> {
  public transform(value: BusinessDTO): BusinessDTO {
    const result = createBusinessSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class CreateDepartmentHeadValidatorPipe implements PipeTransform<DepartmentHeadDTO> {
  public transform(value: DepartmentHeadDTO): DepartmentHeadDTO {
    const result = createDepartmentHeadSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}