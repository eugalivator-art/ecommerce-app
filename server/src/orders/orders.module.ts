import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Address } from 'src/address/entities/address.entity';
// import { OrderdetailsService } from 'src/orderdetails/orderdetails.service';
// import { OrderdetailsModule } from 'src/orderdetails/orderdetails.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Order, Product, Address]
  ),
    // forwardRef(() => OrderdetailsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
