import { UserEntity } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  line1: string;

  @Column({ nullable: false })
  line2: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  pincode: string;

  @Column({ type: 'datetime' })
  createdAt: string;

  // many addresses will be for one userentity
  @ManyToOne((type) => UserEntity, (user) => user.userId)
  user: UserEntity;
}
