import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStatusAdminDialogDialog } from '../dialogs/update-status-admin-dialog/update-status-admin-dialog.dialog';
import { DeleteOrderDialogAdminDialog } from '../dialogs/delete-order-dialog-admin/delete-order-dialog-admin.dialog';
import { DishModel } from '../../../../features/dishes/models/dish.model';
import { OrderModel } from '../../../../features/orders/models/order.model';
import {CreateNewDishDialogDialog} from '../dialogs/create-new-dish/create-new-dish-dialog.dialog';

@Component({
  selector: 'app-admin-order-page',
  templateUrl: './admin-order-page.component.html',
  styleUrls: ['./admin-order-page.component.sass']
})
export class AdminOrderPageComponent implements OnInit {
  countOrdersList: number[] = [];
  items: OrderModel[] = [];
  // tslint:disable-next-line:no-any
  search: any;
  notFound = true;
  emptyApi = true;
  dishId = '';
  dish: DishModel | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly updateDialog: MatDialog,
    private readonly deleteOrderDialog: MatDialog,
    private readonly createDishDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshLists();
    this.refreshCountOfOrders();
  }

  private refreshLists(): void {
    this.http.get<OrderModel[]>('http://127.0.0.1:8080/api/orders').subscribe((result) => {
      this.items = result;
    });
  }

  getDishName(dishId: string): void {
    if (dishId !== undefined && Boolean(dishId)) {
      this.emptyApi = false;
      // tslint:disable-next-line:no-console
      console.info(dishId);
      const url = 'http://127.0.0.1:8080/api/dishes/' + dishId;
      // tslint:disable-next-line:no-console
      console.info(dishId);
      this.http.get<DishModel>(url).subscribe((result) => {
        if (result != undefined) {
          this.notFound = true;
          this.dish = result;
        } else {
          this.notFound = false;
          this.dish = undefined;
        }
      });
    } else {
      this.dish = undefined;
      this.notFound = true;
    }
  }

  private refreshCountOfOrders(): void {
    this.http.get<number[]>('http://127.0.0.1:8080/api/orders/analysisOfOrders').subscribe((result) => {
      this.countOrdersList = result;
    });
  }

  openDialog(item: OrderModel): void {
    const idc = item.id;
    const statuss = item.status;
    this.updateDialog.afterAllClosed.subscribe((data) => this.ngOnInit());
    this.updateDialog.open(UpdateStatusAdminDialogDialog, {
      data: {
        id: idc,
        status: statuss
      }
    });
  }
  openDialogCreateDish(): void {
    this.createDishDialog.afterAllClosed.subscribe( );
    this.createDishDialog.open(CreateNewDishDialogDialog   );
  }
  openDialogDeleteOrder(item: OrderModel): void {
    const idc = item.id;
    const statuss = item.status;

    this.deleteOrderDialog.afterAllClosed.subscribe((data) => this.ngOnInit());
    this.deleteOrderDialog.open(DeleteOrderDialogAdminDialog, {
      data: {
        id: idc,
        status: statuss
      }
    });
  }
}
