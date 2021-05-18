import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address, UserEntity, Order]), OrdersModule],
  controllers: [AddressController],
  providers: [AddressService, OrdersService],
})
export class AddressModule {}
