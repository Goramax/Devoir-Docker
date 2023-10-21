import { Item } from 'src/items/items.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name?: string;

  @OneToMany(() => Item, (item) => item.listId)
  public items?: Item[];
}
