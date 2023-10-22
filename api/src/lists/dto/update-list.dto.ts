import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
  @ApiProperty({ example: 'Nouveau nom' })
  name: string;

  constructor(name: string) {
    this.name = name ?? 'Nouveau nom';
  }
}
