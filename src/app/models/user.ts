import {Order} from './order';

export interface User {
  id: number;
  orders: Order[];
}
