import {OrderOptionEnum} from './orderOption.enum';

export class OrderParamModel {
  option: OrderOptionEnum;
  totalAmount: number;
  currentAmount = 0;
  stopped = false;

  constructor(option: OrderOptionEnum, totalAmount: number, currentAmount?: number, stopped?: boolean) {
    this.option = option;
    this.totalAmount = totalAmount;
    this.currentAmount = currentAmount;
    this.stopped = stopped;
  }
}


