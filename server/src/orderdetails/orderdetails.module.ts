import { forwardRef, Module } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { OrderdetailsController } from './orderdetails.controller';
import { Orderdetail } from './entities/orderdetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { OrdersService } from 'src/orders/orders.service';
import { ProductService } from 'src/product/product.service';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Orderdetail,Order,Product]
  ),
    // forwardRef(() => OrdersModule),
    OrdersModule, 
    ProductModule],
  controllers: [OrderdetailsController],
  providers: [OrderdetailsService, OrdersService, ProductService]
})
export class OrderdetailsModule {}
