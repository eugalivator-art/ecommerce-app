import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrdersService } from 'src/orders/orders.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';
import { Orderdetail } from './entities/orderdetail.entity';

@Injectable()
export class OrderdetailsService {

   constructor(
     @InjectRepository(Orderdetail)
     private orderDetailRepository: Repository<Orderdetail>,
     private orderService: OrdersService,
     private userService: UserService,
     private productService: ProductService,
     ) { }
  
  async create(uid: string, pid: number, oid: number, createOrderdetailDto: CreateOrderdetailDto) {
    const user = await this.userService.findById(uid)
    const product = await this.productService.findOne(pid)
    const order = await this.orderService.findOne(uid, oid)
    const { quantity, amount } = createOrderdetailDto;

    return this.orderDetailRepository.save({
      quantity: quantity,
      itemAmount: amount ,
      orderShippingDate:new Date().toISOString(),
      orderDate:new Date().toISOString(),
      user:user, 
      productId:product,
      orderId:order,
    });
  }

  findAll(uid: string, oid: number) {
    return this.orderDetailRepository.find({
      where: { orderId: oid, userId:uid }
    }).then((data) => {
      if (data.length == 0) throw new NotFoundException();
      return data;
    });
  }
  
  findOne(id: number) {
    return `This action returns a #${id} orderdetail`;
  }

  
  update(id: number, updateOrderdetailDto: UpdateOrderdetailDto) {
    return `This action updates a #${id} orderdetail`;
  }

  remove(id: number) {
    return this.orderDetailRepository.delete({
      orderDetailId:id
    });
  }
}
