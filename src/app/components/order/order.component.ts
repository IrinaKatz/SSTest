import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order} from '../../models/order';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent  {

  @Input() order: Order;
  @Output() remove = new EventEmitter();
  constructor(private service: OrderService) { }

  onDelete(i) {
    this.order.options.splice(i, 1);
    if (this.order.options.length !== 0) {
      console.log(this.order.options);
      this.service.updateOrder(this.order);
    } else {
      this.service.removeOrder(this.order);
      this.remove.emit(this.order);
    }

  }
}
