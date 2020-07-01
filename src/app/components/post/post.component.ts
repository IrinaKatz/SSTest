import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {OrderParam} from '../../models/orderParam';
import {OrderOption} from '../../models/orderOption';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  url = ''
  options = new Subject<OrderParam[]>();
  priceList = {
    VK: {
      Лайки: 2,
      Репосты: 2.2,
      Подписчики: 4
    },
    Instagram: {
      Лайки: 5,
      Репосты: 1.3,
      Подписчики: 5
    },
    Twitter: {
      Лайки: 3,
      Репосты: undefined,
      Подписчики: 3.5
    }
  }
    constructor(private router: Router) { }

  ngOnInit() {
    this.options.subscribe();
  }

  onClose() {
    this.router.navigateByUrl('');
  }

  onUrlEnter() {
    this.options.next([{
      option: OrderOption.LIKE,
      totalAmount: 0,
      currentAmount: 0,
      stopped: false
    }, {
      option: OrderOption.REPOST,
      totalAmount: 0,
      currentAmount: 0,
      stopped: false
    }]);
  }
}
