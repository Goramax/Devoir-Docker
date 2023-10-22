import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';

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
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: ['list'],
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async create(itemDto: CreateItemDto): Promise<ItemDto> {
    const item = new Item();
    Object.assign(item, itemDto, { list: { id: itemDto.listId } });
    const newItem = await this.itemsRepository.save(item);
    return new ItemDto(newItem);
  }

  async update(id: number, itemDto: UpdateItemDto): Promise<void> {
    const item = await this.findOneById(id);
    this.itemsRepository.save({ ...item, ...itemDto });
    return;
  }

  async delete(id: number): Promise<void> {
    const item = await this.findOneById(id);
    this.itemsRepository.remove(item);
    return;
  }
}
