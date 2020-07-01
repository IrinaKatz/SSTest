import {OrderOption} from './orderOption';

export class OrderParam {
  option: OrderOption;
  totalAmount: number;
  currentAmount = 0;
  stopped = false;

  constructor(option: OrderOption, totalAmount: number, currentAmount?: number, stopped?: boolean) {
    this.option = option;
    this.totalAmount = totalAmount;
    this.currentAmount = currentAmount;
    this.stopped = stopped;
  }
}


