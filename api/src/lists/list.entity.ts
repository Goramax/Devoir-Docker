import { Item } from 'src/items/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(() => Item, (item) => item.list)
  public items!: Item[];
}
