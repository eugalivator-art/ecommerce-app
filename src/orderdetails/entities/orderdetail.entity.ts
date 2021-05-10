import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Order} from "src/orders/entities/order.entity"
import { Product } from "src/product/entities/product.entity";
import { UserEntity } from "src/auth/entities/user.entity";

@Entity()
export class Orderdetail {
    
    @PrimaryGeneratedColumn() 
    orderDetailId: number;

    @Column({ default: 1, type: 'integer' })
    quantity: number;

    @Column({ default: 0, type: 'decimal' })
    itemAmount: number;

    @Column({ type: 'datetime', nullable: true})
    orderShippingDate: Date = new Date();

    @Column({type: 'datetime'})
    orderDate: Date = new Date();

    @ManyToOne((type) => Order, (order) => order.orderId)
    orderId: Order;

    @ManyToOne((type) => Product, (product) => product.productId)
    productId: Product;

    @ManyToOne((type) => UserEntity, (user) => user.userId)
    user: UserEntity;

}
