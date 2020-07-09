import {OrderModel} from './order.model';


export interface UserInterface {
  id: number;
  orders: OrderModel[];
}
