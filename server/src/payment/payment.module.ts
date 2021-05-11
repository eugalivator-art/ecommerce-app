import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { OrdersService } from 'src/orders/orders.service';
import { UserService } from 'src/auth/user/user.service';
import { Order } from 'src/orders/entities/order.entity';
import { UserEntity } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Payment, Order, UserEntity]
  )],
  controllers: [PaymentController],
  providers: [PaymentService, OrdersService, UserService]
})
export class PaymentModule {}
