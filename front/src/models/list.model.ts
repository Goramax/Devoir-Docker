import { Item } from './item.model';

export class List {
  id!: number;
  name!: string;
  items?: Item[];
}