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
  private newOrderId = 0;
  private orders: Order[] = this.defaultOrders();
  private priceList = {
    Вконтакте: {
      Лайки: 2,
      Репосты: 2.2,
      Подписчики: 4
    },
    Инстаграм: {
      Лайки: 5,
      Репосты: 1.3,
      Подписчики: 5
    },
    Твиттер: {
      Лайки: 3,
      Репосты: undefined,
      Подписчики: 3.5
    }
  };

  constructor() {
  }

  getPriceList() {
    return this.priceList;
  }

  getDefaultOrder() {
    this.newOrderId++;
    return new Order(this.newOrderId, 1, '', '../../../assets/icons/photo.png', 'Василий Иванович',
      undefined, [], undefined, false, 0);
  }

  defaultOrders(): Order[] {
    const defaultOrders = [
      {
        id: 1,
        userId: 1,
        url: 'brgbrt',
        imagePath: '../../../assets/icons/photo.png',
        header: 'Дмитрий Головаев',
        type: OrderType.ACCOUNT,
        options: [new OrderParam(OrderOption.SUBSCRIBER, 20000, 0, false)],
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
        options: [new OrderParam(OrderOption.LIKE, 20000, 10000, true),
          new OrderParam(OrderOption.REPOST, 15000, 10000, false)],
        socialMedia: SocialMedia.INSTAGRAM,
        acceleration: false,
        sum: 0
      },
    ];
    window.localStorage.setItem('orders', JSON.stringify(defaultOrders));
    return JSON.parse(window.localStorage.getItem('orders'));
  }

  getOrders(userId: number): Observable<Order[]> {
    return of(JSON.parse(window.localStorage.getItem('orders')));
  }

  addOrder(order: Order): void {
    this.orders.push(order);
    window.localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  setOption(url, media, order) {
    const urlParts = url.split('/');

    for (let i = 0; i < urlParts.length; i++) {
      // first check - if it is an url of listed social media
      if (urlParts[i].includes(media + '.com')) {
        if (i >= (urlParts.length - 1)) {
          return false;
        }
        // second check - if it is a post in social media
        if (urlParts[i + 1].includes('?w=')
          || (urlParts[i + 1] === 'p' && urlParts.length >= (i + 2))
          || (urlParts[i + 2] === 'status' && urlParts.length >= (i + 3))) {
          order = this.setPostOptions(media, order);
          return order;
          // third check - if it is an account in social media
        } else if ((media === 'vk' && !urlParts[i + 1].includes('?'))
          || (media === 'instagram' && urlParts[i + 1].toString() !== 'p' && urlParts.length <= (i + 3))
          || (media === 'twitter' && urlParts[i + 1].toString() !== 'home' && urlParts.length >= (i + 2))) {
          order = this.setAccountOptions(order);
          return order;
        }
      }
    }
    return false;
  }

  setPostOptions(media, order) {
    order = this.cleanOrder(order);
    order.type = OrderType.POST;
    if (media === 'twitter') {
      order.options.push({
        option: OrderOption.LIKE,
        totalAmount: 0,
        currentAmount: 0,
        stopped: false
      });
    } else {
      order.options.push({
        option: OrderOption.LIKE,
        totalAmount: 0,
        currentAmount: 0,
        stopped: false
      }, {
        option: OrderOption.REPOST,
        totalAmount: 0,
        currentAmount: 0,
        stopped: false
      });
    }
    return order;
  }

  setAccountOptions(order) {
    order = this.cleanOrder(order);
    order.type = OrderType.ACCOUNT;
    order.options.push({
      option: OrderOption.SUBSCRIBER,
      totalAmount: 0,
      currentAmount: 0,
      stopped: false
    });
    return order;
  }

  private cleanOrder(order) {
    order.sum = 0;
    order.acceleration = false;
    order.options = [];
    return order;
  }

  updateOrder(modifiedOrder: Order) {
    this.orders.forEach(order => {
      if (order.id === modifiedOrder.id) {
        order = modifiedOrder;
      }
    });
    window.localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  removeOrder(orderToRemove: Order) {
    this.orders.forEach(order => {
      let orderIndex = 0;
      if (order.id === orderToRemove.id) {
          this.orders.splice(orderIndex, 1);
        }
      orderIndex++;
    });
    window.localStorage.setItem('orders', JSON.stringify(this.orders));
  }
}
