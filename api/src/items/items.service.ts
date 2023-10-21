import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}
  async findByListId(listId: number): Promise<Item[]> {
    return this.itemsRepository.find({ where: { list: { id: listId } } });
  }
  async findOneById(id: number): Promise<Item> {
    return this.itemsRepository.findOneBy({ id });
  }
}
