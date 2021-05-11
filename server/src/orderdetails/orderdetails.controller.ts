import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Orderdetails')
@Controller('orderdetail')
@UseGuards(JwtAuthGuard)
  
export class OrderdetailsController {
  constructor(private readonly orderdetailsService: OrderdetailsService) {}

  @Post()
  create(@Request() req: any, @Body() createOrderdetailDto: CreateOrderdetailDto) {
    console.log(req);
    return this.orderdetailsService.create(req.user.userId, req.body.prodId, req.body.orderId, createOrderdetailDto);
  }

  @Get()
  findAll(@Request() req:any) {
    return this.orderdetailsService.findAll(req.user.userId, req.body.orderId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderdetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderdetailDto: UpdateOrderdetailDto) {
    return this.orderdetailsService.update(+id, updateOrderdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderdetailsService.remove(+id);
  }
}
