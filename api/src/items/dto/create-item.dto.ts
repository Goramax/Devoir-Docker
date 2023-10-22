import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../item.entity';

export class CreateItemDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  listId: number;

  constructor(value: Item) {
    this.text = value.text ?? '';
    this.listId = value.list?.id ?? 0;
  }
}
