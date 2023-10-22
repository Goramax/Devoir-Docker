import { ApiProperty } from '@nestjs/swagger';
import { Item } from 'src/items/item.entity';
import { List } from '../list.entity';

export class DetailedListDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Liste 1' })
  name: string;

  @ApiProperty({ example: [{ id: 1, text: 'Item 1', isCompleted: false }] })
  items: Item[];

  constructor(value: List) {
    this.id = value.id ?? 0;
    this.name = value.name ?? '';
    this.items = value.items ?? [];
  }
}
