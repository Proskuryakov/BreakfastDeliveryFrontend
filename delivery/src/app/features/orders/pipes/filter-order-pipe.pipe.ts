import { Pipe, PipeTransform } from '@angular/core';
import { OrderModel } from '../models/order.model';

@Pipe({
  name: 'filterOrder'
})
export class FilterOrderPipe implements PipeTransform {
  transform(items: OrderModel[], filter: string): OrderModel[] {
    if (filter == undefined) {
      return items;
    }

    return items.filter(
      (item) => item.id.toString().indexOf(filter) !== -1 || item.status.toString().indexOf(filter.toUpperCase()) !== -1
    );
  }
}
