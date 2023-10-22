import { Injectable, NotFoundException } from '@nestjs/common';
import { List } from './list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { DetailedListDto } from './dto/list-detailed.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,
  ) {}
  async findAll(): Promise<List[]> {
    return this.listsRepository.find();
  }
  async findOne(id: number): Promise<DetailedListDto> {
    const list = await this.listsRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!list) {
      throw new NotFoundException('List not found');
    }
    return new DetailedListDto(list);
  }

  async create(createListDto: CreateListDto): Promise<void> {
    const list = await this.listsRepository.save(createListDto);
    if (!list) {
      throw new Error('List not created');
    }
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.findOne(id);
    if (!list) {
      throw new NotFoundException('List not found');
    }
    return this.listsRepository.save({ ...list, ...updateListDto });
  }

  async delete(id: number): Promise<List> {
    const list = await this.findOne(id);
    return this.listsRepository.remove(list);
  }
}
