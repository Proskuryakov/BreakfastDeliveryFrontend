import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DialogModelUpdateOrderStatus } from '../../../../../features/orders/models/order.model';
import { OrdersApiService } from '../../../../../features/orders/services/orders-api.service';

@Component({
  templateUrl: './delete-order-dialog-admin.dialog.html',
  styleUrls: ['./delete-order-dialog-admin.dialog.sass']
})
export class DeleteOrderDialogAdminDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelUpdateOrderStatus,
    private readonly http: HttpClient,
    private readonly orderApiService: OrdersApiService
  ) {}

  click = true;
  nextStage = '';
  clickBtn = false;
  idOrder: number = this.data.id;

  ngOnInit(): void {}

  deleteOrder(): void {
    if (this.idOrder != undefined) {
      this.orderApiService.deleteOrderById(this.idOrder.toString()).subscribe(
        (res) => {
          // tslint:disable-next-line:no-console
          console.info(res);
          if (res) {
            this.click = false;
            this.clickBtn = true;
            this.nextStage = 'Заказ успешно удалён';
          } else {
            this.click = false;
            this.clickBtn = false;
            this.nextStage = 'Заказ не удалось удалить';
          }
        },
        // tslint:disable-next-line:no-unused-expression no-any
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
