import { Injectable } from '@nestjs/common';
import { CreateLinkedinDto } from './dto/create-linkedin.dto';
import { UpdateLinkedinDto } from './dto/update-linkedin.dto';

@Injectable()
export class LinkedinService {
  create(createLinkedinDto: CreateLinkedinDto) {
    return 'This action adds a new linkedin';
  }

  findAll() {
    return `This action returns all linkedin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} linkedin`;
  }

  update(id: number, updateLinkedinDto: UpdateLinkedinDto) {
    return `This action updates a #${id} linkedin`;
  }

  remove(id: number) {
    return `This action removes a #${id} linkedin`;
  }
}
