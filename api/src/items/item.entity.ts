import { List } from 'src/lists/list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public text?: string;

  @Column()
  public isCompleted?: boolean;

  @ManyToOne(() => List, (list) => list.items)
  public list?: List;
}
