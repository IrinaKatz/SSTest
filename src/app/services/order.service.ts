import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Order} from '../models/order';
import {OrderType} from '../models/orderType';
import {OrderParam} from '../models/orderParam';
import {SocialMedia} from '../models/socialMedia';
import {OrderOption} from '../models/orderOption';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = this.defaultOrders();

  constructor() {
  }

  defaultOrders(): Order[] {
    return [
      {
        id: 1,
        userId: 1,
        url: 'brgbrt',
        imagePath: '../../../assets/icons/photo.png',
        header: 'Дмитрий Головаев',
        type: OrderType.ACCOUNT,
        options: [new OrderParam(OrderOption.SUBSCRIBER,   20000, 0, false)],
        socialMedia: SocialMedia.INSTAGRAM,
        acceleration: false,
        sum: 0
      },
      {
        id: 2,
        userId: 1,
        url: 'brgbrt',
        imagePath: '../../../assets/icons/postImg.png',
        header: 'Андрей Иванович',
        type: OrderType.POST,
        options: [new OrderParam(OrderOption.LIKE,   20000, 10000, true),
                  new OrderParam(OrderOption.REPOST, 15000, 10000, false)],
        socialMedia: SocialMedia.INSTAGRAM,
        acceleration: false,
        sum: 0
      },
    ];
  }

  getOrders(userId: number): Observable<Order[]> {
    return of(this.orders);
  }

  addOrder(order: Order): void {
    this.orders.push(order);
  }
}
