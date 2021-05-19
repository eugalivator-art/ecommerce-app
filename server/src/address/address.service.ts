import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private userService: UserService,
    private orderService: OrdersService,
  ) { }
  
  async create(uid: string, oid: number, createAddressDto: CreateAddressDto) {
    const user = await this.userService.findById(uid);
    const orderId = await this.orderService.findOne(uid, oid)
    const { city, line1, line2, pincode, country, state } = createAddressDto;
    
    return this.addressRepository.save({
      city,
      line1,
      line2,
      pincode,
      state,
      country,
      user,
      orderId,
      createdAt: new Date().toISOString(),
    });
  }

  findAll(uid:string, oid:number) {
    return this.addressRepository.find({
      where:{orderId:oid, user:uid}
    }).then((data) => {
      if (data.length == 0) throw new
        NotFoundException();
      return data;
    });
  }

  async findOne(id: number) {
    return this.addressRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
    });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(
      { id },
      {
        ...updateAddressDto,
      },
    );
  }

  remove(id: number) {
    return this.addressRepository.delete({ id });
  }
}
