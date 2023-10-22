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
import { ListsService } from './lists.service';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

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
  async findOne(@Param('id') id?: number) {
    const list = await this.listsService.findOne(id);
    return list;
  }

  @Post()
  @ApiNoContentResponse({ description: 'List created' })
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateListDto: UpdateListDto) {
    const list = await this.listsService.update(id, updateListDto);
    return list;
  }

  @Patch(':id')
  async replace(@Param('id') id: number, @Body() updateListDto: UpdateListDto) {
    const list = await this.listsService.update(id, updateListDto);
    return list;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const list = await this.listsService.delete(id);
    return list;
  }
}
