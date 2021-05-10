import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNotEmpty } from "class-validator";
import { Repository } from "typeorm";
import { Orderdetail } from "../entities/orderdetail.entity";

@Injectable()
export class CreateOrderdetailDto {

    @ApiProperty()
    @IsNotEmpty()
    orderId: number;
    
    @ApiProperty()
    @IsNotEmpty()
    prodId: number

    @ApiProperty()
    @IsNotEmpty()
    quantity: number

    @ApiProperty()
    @IsNotEmpty()
    amount: number
}
