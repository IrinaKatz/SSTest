import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OrderModel} from './order.model';
import {OrderTypeEnum} from './orderType.enum';
import {OrderParamModel} from './orderParam.model';
import {OrderOptionEnum} from './orderOption.enum';
import {SocialMediaEnum} from './socialMedia.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderAdded = new BehaviorSubject(false);
  private newOrderId = 0;
  private orders: OrderModel[] = this.defaultOrders();
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
    return new OrderModel(this.newOrderId, 1, '', '../../../assets/icons/photo.png', 'Василий Иванович',
      undefined, [], undefined, false, 0);
  }

  defaultOrders(): OrderModel[] {
    const defaultOrders = [
      {
        id: 1,
        userId: 1,
        url: 'brgbrt',
        imagePath: '../../../assets/icons/photo.png',
        header: 'Дмитрий Головаев',
        type: OrderTypeEnum.ACCOUNT,
        options: [new OrderParamModel(OrderOptionEnum.SUBSCRIBER, 20000, 0, false)],
        socialMedia: SocialMediaEnum.INSTAGRAM,
        acceleration: false,
        sum: 0
      },
      {
        id: 2,
        userId: 1,
        url: 'brgbrt',
        imagePath: '../../../assets/icons/postImg.png',
        header: 'Андрей Иванович',
        type: OrderTypeEnum.POST,
        options: [new OrderParamModel(OrderOptionEnum.LIKE, 20000, 10000, true),
          new OrderParamModel(OrderOptionEnum.REPOST, 15000, 10000, false)],
        socialMedia: SocialMediaEnum.INSTAGRAM,
        acceleration: false,
        sum: 0
      },
    ];
    window.localStorage.setItem('orders', JSON.stringify(defaultOrders));
    return JSON.parse(window.localStorage.getItem('orders'));
  }

  getOrders(userId: number): Observable<OrderModel[]> {
    return of(JSON.parse(window.localStorage.getItem('orders')));
  }

  addOrder(order: OrderModel): void {
    this.orders.push(order);
    window.localStorage.setItem('orders', JSON.stringify(this.orders));
    this.orderAdded.next(true);
  }

  setOption(url, media, order) {
    const urlParts = url.split('/');

    for (let i = 0; i < urlParts.length; i++) {
      // first check - if it is an url of listed social media
      if (urlParts[i].includes(media + '.com')) {
        if (i >= (urlParts.length - 1)) {
          return false;
        }
        // second check - if it is a new-order in social media
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
    order.type = OrderTypeEnum.POST;
    if (media === 'twitter') {
      order.options.push({
        option: OrderOptionEnum.LIKE,
        totalAmount: 0,
        currentAmount: 0,
        stopped: false
      });
    } else {
      order.options.push({
        option: OrderOptionEnum.LIKE,
        totalAmount: 0,
        currentAmount: 0,
        stopped: false
      }, {
        option: OrderOptionEnum.REPOST,
        totalAmount: 0,
        currentAmount: 0,
        stopped: false
      });
    }
    return order;
  }

  setAccountOptions(order) {
    order = this.cleanOrder(order);
    order.type = OrderTypeEnum.ACCOUNT;
    order.options.push({
      option: OrderOptionEnum.SUBSCRIBER,
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

  updateOrder(modifiedOrder: OrderModel) {
    this.orders.forEach(order => {
      if (order.id === modifiedOrder.id) {
        order = modifiedOrder;
      }
    });
    window.localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  removeOrder(orderToRemove: OrderModel) {
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
