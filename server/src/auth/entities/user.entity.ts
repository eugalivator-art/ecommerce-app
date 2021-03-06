import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Address } from 'src/address/entities/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Orderdetail } from 'src/orderdetails/entities/orderdetail.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false, unique: true })
  userEmail: string;

  @Column({ nullable: false })
  userPassword: string; // plain text password

  @Column({ type: 'datetime' })
  createdAt: Date;

  // hooks : tasks to be executed
  // this gets executed before every insert operation
  @BeforeInsert()
  async hashPassword() {
    this.userPassword = await bcrypt.hash(this.userPassword, 10); // hashed password
  }

  // one user will have many addressess
  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  
  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.user)
  orderdetail: Orderdetail[];

  @OneToMany(() => Payment, (payment) => payment.user)
  Payment: Payment[];
}
