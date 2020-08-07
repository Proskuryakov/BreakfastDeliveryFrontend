import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (value == undefined) {
      return undefined;
    }
    switch (value) {
      case 'ORDER_IN_PROCESSING':
        return 'Order is in processing';
      case 'ORDER_PREPARING':
        return 'Order is being preparing';
      case 'ORDER_DELIVERY':
        return 'Order is being delivered';
      case 'ORDER_DELIVERED':
        return 'Order has been delivered';
      case 'ORDER_CANCELLED':
        return 'Order has been cancelled';
      default:
        return value;
    }
  }
}
