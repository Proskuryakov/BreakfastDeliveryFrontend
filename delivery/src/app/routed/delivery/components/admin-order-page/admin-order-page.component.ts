import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStatusAdminDialogDialog } from '../dialogs/admin/update-status-admin-dialog/update-status-admin-dialog.dialog';
import { DeleteOrderDialogAdminDialog } from '../dialogs/admin/delete-order-dialog-admin/delete-order-dialog-admin.dialog';
import { DishModel } from '../../../../features/dishes/models/dish.model';
import { OrderModel } from '../../../../features/orders/models/order.model';
import { CreateNewDishDialogDialog } from '../dialogs/admin/create-new-dish/create-new-dish-dialog.dialog';
import { DishesApiService } from '../../../../features/dishes/services/dishes-api.service';
import { OrdersApiService } from '../../../../features/orders/services/orders-api.service';
import { Router } from '@angular/router';

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

  dishId = '';
  dish: DishModel | undefined;

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly updateDialog: MatDialog,
    private readonly deleteOrderDialog: MatDialog,
    private readonly createDishDialog: MatDialog,
    private readonly orderApiService: OrdersApiService,
    private readonly dishApiService: DishesApiService
  ) {}

  ngOnInit(): void {
    this.refreshLists();
    this.refreshCountOfOrders();
  }

  private refreshLists(): void {
    this.orderApiService.getListOfOrders().subscribe((result) => {
      this.items = result;
    });
  }

  getDishName(dishId: string): void {
    if (dishId !== undefined && Boolean(dishId)) {
      this.dishApiService.getDishByDishId(dishId).subscribe((result) => {
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
    this.orderApiService.getListCountOfCurrentOrders().subscribe((result) => {
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

  goToRestaurantManagement(): void {
    this.router.navigateByUrl(`/admin/restaurants`);
  }
}
