import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID, } from 'class-validator';

export class BusinessDTO {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string

    @ApiProperty({ required: true })
    @IsString()
    name: string

    @ApiProperty({ required: true })
    @IsString()
    location: string

    @ApiProperty({ required: true })
    @IsString()
    type: string

    @ApiProperty()
    @IsArray()
    departmentHeads: []
}
