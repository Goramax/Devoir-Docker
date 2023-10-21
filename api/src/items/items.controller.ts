import { Controller, Get, Param } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get(':listId')
  @ApiQuery({ name: 'listId', required: true, type: Number })
  async findByListId(@Param('listId') listId?: number) {
    const items = await this.itemsService.findByListId(listId);
    return items;
  }

  @Get(':id')
  @ApiQuery({ name: 'id', required: true, type: Number })
  async findOne(@Param('id') id?: number) {
    const item = await this.itemsService.findOneById(id);
    return item;
  }
}
