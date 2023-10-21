import { Injectable } from '@nestjs/common';
import { List } from './list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,
  ) {}
  async findAll(): Promise<List[]> {
    return this.listsRepository.find();
  }
  async findOne(id: number): Promise<List> {
    return this.listsRepository.findOneBy({ id });
  }
}
