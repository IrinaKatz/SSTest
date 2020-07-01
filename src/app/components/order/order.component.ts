import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  active = true;
  @Input() order: Order;
  constructor() { }

  ngOnInit() {
    console.log(this.order);
  }



}
