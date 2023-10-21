import { Controller, Get, Param } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('lists')
@ApiTags('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  async findAll() {
    const lists = await this.listsService.findAll();
    return lists;
  }

  @Get(':id')
  @ApiQuery({ name: 'id', required: true, type: Number })
  async findOne(@Param('id') id?: number) {
    const list = await this.listsService.findOne(id);
    return list;
  }
}
