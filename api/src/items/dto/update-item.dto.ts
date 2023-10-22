import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../item.entity';

export class UpdateItemDto {
  @ApiProperty()
  text: string;
  @ApiProperty()
  isCompleted: boolean;

  constructor(value: Item) {
    this.text = value.text ?? '';
    this.isCompleted = value.isCompleted ?? false;
  }
}
