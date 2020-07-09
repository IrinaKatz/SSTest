import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDecimal'
})
export class MyDecimalPipe implements PipeTransform {

  transform(val: any): any {
    if (val !== undefined && val !== null) {
      return Math.round(val).toLocaleString('fr-FR');
    } else {
      return '';
    }
  }
}
