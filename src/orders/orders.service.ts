import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>, private userService: UserService){}
  
  async create(uid: string, createOrderDto: CreateOrderDto) {
    const user = await this.userService.findById(uid);
    const { amount, status } = createOrderDto;
    return this.orderRepository.save({
      orderAmount:amount,
      orderShippingDate: new Date().toISOString(),
      orderDate: new Date().toISOString(),
      user
    });
  }

  findAll(uid: string) {
    return this.orderRepository.find({where:{user: uid }}).then((data) => {
      if (data.length==0) throw new NotFoundException();
      return data;
    });
  }

  findOne(uid: string, id: number) {
    return this.orderRepository.findOne({
      where: { user: uid, orderId: id }
    }).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
      
    });
  }

 update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(
      { orderId: id },
      {
        orderAmount: updateOrderDto.amount,
        orderStatus: updateOrderDto.status,
        orderShippingDate: new Date().toISOString(),
      },
    );
 }
  
  remove(id: number) {
    return this.orderRepository.delete({
      orderId:id
    });
  }
}
