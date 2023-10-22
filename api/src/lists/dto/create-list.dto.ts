import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ example: 'Nouvelle liste' })
  name: string;

  constructor(name: string) {
    this.name = name ?? 'Nouvelle liste';
  }
}
