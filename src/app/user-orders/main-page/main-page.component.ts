import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderModel} from '../shared/order.model';
import {OrderService} from '../shared/order.service';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewOrderComponent} from './new-order/new-order.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit, OnDestroy {

  orders: OrderModel[];
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private orderService: OrderService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    this.subscription = this.orderService.getOrders(1).subscribe(orders => this.orders = orders);
    this.subscription2 = this.orderService.orderAdded.subscribe(res => {
      if (res === true) {
        this.subscription = this.orderService.getOrders(1).subscribe(orders => this.orders = orders);
      }
    });
  }


  onOrderRemove(orderToRemove: OrderModel) {
    this.orders.forEach(order => {
      let orderIndex = 0;
      if (order.id === orderToRemove.id) {
        this.orders.splice(orderIndex, 1);
      }
      orderIndex++;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
    if (this.subscription2) { this.subscription2.unsubscribe(); }
  }

  open() {
      this.modalService.open(NewOrderComponent);
  }
}
