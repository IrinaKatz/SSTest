import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {

  orders: Order[];
  subscription: Subscription;
  constructor(private orderService: OrderService,
              private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.orderService.getOrders(1).subscribe(orders => this.orders = orders);
  }

  onNewOrder() {
    this.router.navigateByUrl('new');
  }

  onOrderRemove(orderToRemove: Order) {
    this.orders.forEach(order => {
      let orderIndex = 0;
      if (order.id === orderToRemove.id) {
        this.orders.splice(orderIndex, 1);
      }
      orderIndex++;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
