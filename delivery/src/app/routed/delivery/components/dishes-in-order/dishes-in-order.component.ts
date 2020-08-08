import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RegisterOrderDialogDialog } from '../dialogs/register-order-dialog/register-order-dialog.dialog';
import { DeleteDishFromOrderDialogDialog } from '../dialogs/delete-dish-from-order-dialog/delete-dish-from-order-dialog.dialog';
import { DataService } from '../../../../data.service';
import { OrderModel } from '../../../../features/orders/models/order.model';
import {
  DishesFromOrderToDisplayModel,
  DishFromBasketModel,
  DishFromOrderModel
} from '../../../../features/dishes/models/dish.model';
import { DishesApiService } from '../../../../features/dishes/services/dishes-api.service';
import { OrdersApiService } from '../../../../features/orders/services/orders-api.service';

@Component({
  selector: 'app-dishes-in-order',
  templateUrl: './dishes-in-order.component.html',
  styleUrls: ['./dishes-in-order.component.sass'],
  providers: [DataService]
})
export class DishesInOrderComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  dishesFromBasket: DishFromBasketModel[] = [];

  dishesFromOrder: DishFromOrderModel[] = [];

  dishesFromBasketToDisplay: DishesFromOrderToDisplayModel[] = [];

  dishesFromOrderToDisplay: DishesFromOrderToDisplayModel[] = [];

  date = '';

  order: OrderModel | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly dataService: DataService,
    private readonly dishesApiService: DishesApiService,
    private readonly orderApiService: OrdersApiService
  ) {}

  ngOnInit(): void {
    this.dishesApiService
      .getDishesFromBasket(this.dataService.getUserId())
      .subscribe((result) => {
        this.dishesApiService.getDishesFromBasketToDisplay(
          result
        );
      });
    this.orderApiService
      .getOrderByUserId(this.dataService.getUserId())
      .subscribe((result) => {
        this.order = result;
        this.order.createdAt = String(
          Number(this.order.createdAt) * 1000
        );
      });
  }

  /*handleRegisterOrderClick(): void {
    const dialogRef = this.dialog.open(
      RegisterOrderDialogDialog,
      {
        data: {
          dishes: this.dishesFromBasket
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.dishesApiService.clearBasketAndRefresh(
        this.date,
        this.order,
        this.dishesFromOrder,
        this.dishesFromBasket,
        this.dishesFromBasketToDisplay,
        this.dataService.getUserId()
      );
    });
  }*/

  /*handleDeleteDishFromOrderClick(
    dishIdValue: number
  ): void {
    const dialogRef = this.dialog.open(
      DeleteDishFromOrderDialogDialog,
      {
        data: {
          dishId: dishIdValue,
          userId: this.dataService.getUserId()
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.dishesApiService.getDishesFromBasket(
        this.dishesFromBasket,
        this.dishesFromBasketToDisplay,
        this.dataService.getUserId()
      );
    });
  }*/

  /*handleChangeDishCountClick(
    dishId: number,
    dishCount: number
  ): void {
    if (dishCount >= 1 && dishCount <= 9) {
      this.dishesApiService.changeDishCount(
        this.dishesFromBasket,
        this.dishesFromBasketToDisplay,
        dishId,
        dishCount,
        this.dataService.getUserId()
      );
    }
  }*/
}
