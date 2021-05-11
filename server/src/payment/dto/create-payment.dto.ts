import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
    
    @ApiProperty()
    paidAmount: number;

    @ApiProperty()
    cardNo: number;

    @ApiProperty()
    cvv: number;

    @ApiProperty()
    expir: string;
}
