import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Product } from "src/product/entities/product.entity";

export class CreateOrderDto {

    @ApiProperty()
    @IsNotEmpty()
    amount: number;

}
