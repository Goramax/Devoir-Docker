import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public text?: string;

  @Column()
  public isCompleted?: boolean;

  @Column()
  public listId?: number;
}
