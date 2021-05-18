import { Address } from "src/address/entities/address.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { Orderdetail } from "src/orderdetails/entities/orderdetail.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn() 
    orderId: number;

    @Column({ default: 0, type: 'decimal' })
    orderAmount: number;

    @Column({ type: 'datetime', nullable: true})
    orderShippingDate: Date = new Date();

    @Column({default:'processing'})
    orderStatus: string;

    @Column({type: 'datetime'})
    orderDate: Date = new Date();

    @ManyToOne((type) => UserEntity, (user) => user.userId)
    user: UserEntity;

    @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.orderId)
    orderdetail: Orderdetail[];

    @OneToMany(() => Payment, (payment) => payment.paymentId)
    payment: Payment[];

    @OneToMany(() => Address, (address) => address.id)
    address: Address[];

}
