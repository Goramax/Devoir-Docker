import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('list/:listId')
  @ApiOkResponse({ type: Item })
  async findByListId(@Param('listId') listId?: number) {
    const items = await this.itemsService.findByListId(listId);
    return items;
  }

  @Get(':id')
  @ApiOkResponse({ type: ItemDto })
  @ApiNotFoundResponse({
    description: 'Item not found',
  })
  async findOneById(@Param('id') id: number): Promise<ItemDto> {
    const item = await this.itemsService.findOneById(id);
    return new ItemDto(item);
  }

  @Post()
  @ApiOkResponse({ type: ItemDto })
  async create(@Body() itemDto: CreateItemDto): Promise<ItemDto> {
    return this.itemsService.create(itemDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() itemDto: UpdateItemDto) {
    await this.itemsService.update(id, itemDto);
    return;
  }

  @Put(':id')
  @ApiOkResponse({ type: Item })
  async replace(
    @Param('id') id: number,
    @Body() itemDto: UpdateItemDto,
  ): Promise<Item> {
    await this.itemsService.update(id, itemDto);
    return;
  }

  @Delete(':id')
  @ApiOkResponse({ type: Item })
  async delete(@Param('id') id: number): Promise<Item> {
    await this.itemsService.delete(id);
    return;
  }
}
