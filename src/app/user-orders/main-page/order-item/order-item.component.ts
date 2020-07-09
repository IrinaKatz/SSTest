import {Component, Input, Output, ViewEncapsulation} from '@angular/core';
import {OrderModel} from '../../shared/order.model';
import {OrderService} from '../../shared/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderItemComponent  {

  @Input() order: OrderModel;

  constructor(private service: OrderService) { }

  onDelete(i) {
    this.order.options.splice(i, 1);
    if (this.order.options.length !== 0) {
      console.log(this.order.options);
      this.service.updateOrder(this.order);
    } else {
      this.service.removeOrder(this.order);
    }
  }
}
