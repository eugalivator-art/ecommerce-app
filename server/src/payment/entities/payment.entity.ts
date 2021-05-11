import { UserEntity } from "src/auth/entities/user.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    paymentId: number;

    @Column({ default: "finished"})
    paymentStatus: string;

    @Column({default:0 , type:'decimal'})
    paidAmount: number;

    @Column({default:0, type:'integer'})
    cardNo: number

    @Column({default:0, type:'integer'})
    cvv: number

    @Column()
    expiration: string;

    @Column({ type: 'datetime'})
    createdAt: string;

    @ManyToOne((type) => UserEntity, (user) => user.userId)
    user: UserEntity;

    @ManyToOne((type) => Order, (order) => order.orderId)
    orderId: Order;

 }
