import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../item.entity';

export class ItemDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  text: string;
  @ApiProperty()
  isCompleted: boolean;
  @ApiProperty()
  listId: number;
  constructor(value: Item) {
    this.id = value.id ?? 0;
    this.text = value.text ?? '';
    this.isCompleted = value.isCompleted ?? false;
    this.listId = value.list?.id ?? 0;
  }
}
