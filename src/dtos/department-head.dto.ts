import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, } from 'class-validator';
import { Business } from 'src/business/models/business.entity';

export class DepartmentHeadDTO {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string

    @ApiProperty({ required: true })
    @IsString()
    name: string

    @ApiProperty({ required: true })
    @IsString()
    email: string

    @ApiProperty({ required: true })
    @IsString()
    role: string

    @ApiProperty({ required: true })
    @IsString()
    business: Business
}
