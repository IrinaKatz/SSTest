import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  orders: Order[];
  constructor(private orderService: OrderService,
              private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders(1).subscribe(orders => this.orders = orders);
  }

  onNewOrder() {
    this.router.navigateByUrl('new');
  }
}
