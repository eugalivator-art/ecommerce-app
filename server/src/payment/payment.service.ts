import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>, private userService:UserService, private orderService: OrdersService){}
  
  async create(uid: string, oid: number, createPaymentDto: CreatePaymentDto) {
    const user = await this.userService.findById(uid);
    const order = await this.orderService.findOne(uid, oid)
    const { paidAmount, cardNo, cvv, expir } = createPaymentDto;

    return this.paymentRepository.save({
      paidAmount: paidAmount,
      cardNo: cardNo,
      cvv: cvv,
      expiration: expir,
      user:user, 
      orderId: order,
      createdAt: new Date().toISOString(),
    });
  }

  findAll(uid: string, oid: number) {
    return this.paymentRepository.find({
      where: { orderId: oid, user:uid }
    }).then((data) => {
      if (data.length == 0) throw new NotFoundException();
      return data;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return this.paymentRepository.delete({
      paymentId:id
    });
  }
}
