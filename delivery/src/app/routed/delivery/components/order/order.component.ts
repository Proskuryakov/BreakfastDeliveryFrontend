import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RegisterOrderDialogDialog } from '../dialogs/register-order-dialog/register-order-dialog.dialog';
import { DeleteDishFromBasketDialogDialog } from '../dialogs/delete-dish-from-basket-dialog/delete-dish-from-basket-dialog.dialog';
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
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass'],
  providers: [DataService]
})
export class OrderComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  dishesFromBasket: DishFromBasketModel[] = [];

  dishesFromBasketToDisplay: DishesFromOrderToDisplayModel[] = [];

  dishesFromOrder: DishFromOrderModel[] = [];

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
        this.dishesFromBasket = result;
        this.dishesApiService
          .getDishesFromBasketToDisplay(result)
          .subscribe((resultToDisplay) => {
            this.dishesFromBasketToDisplay = resultToDisplay;
          });
      });
    this.orderApiService
      .getOrderByUserId(this.dataService.getUserId())
      .subscribe((resultOrder) => {
        this.order = resultOrder;
        if (this.order !== null) {
          this.dishesFromOrder = resultOrder.listOfDishes;
          this.order.createdAt = String(
            Number(this.order.createdAt) * 1000
          );
          this.orderApiService
            .getDishesFromOrderToDisplay(
              this.dishesFromOrder
            )
            .subscribe((resultDishes) => {
              this.dishesFromOrderToDisplay = resultDishes.sort(
                this.dishesApiService.sortDishesByDishName
              );
            });
        }
      });
  }

  handleRegisterOrderClick(): void {
    const dialogRef = this.dialog.open(
      RegisterOrderDialogDialog,
      {
        data: {
          dishes: this.dishesFromBasket
        }
      }
    );
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.dishesApiService
          .clearBasket(this.dataService.getUserId())
          .subscribe(() => {
            this.dishesFromBasket = [];
            this.dishesApiService
              .getDishesFromBasket(
                this.dataService.getUserId()
              )
              .subscribe((result) => {
                this.dishesApiService
                  .getDishesFromBasketToDisplay(result)
                  .subscribe((resultToDisplay) => {
                    this.dishesFromBasketToDisplay = resultToDisplay.sort(
                      this.dishesApiService
                        .sortDishesByDishName
                    );
                    this.orderApiService
                      .getOrderByUserId(
                        this.dataService.getUserId()
                      )
                      .subscribe((orderResult) => {
                        this.order = orderResult;
                      });
                  });
              });
          });
      }
    });
  }

  handleDeleteDishFromBasketClick(
    dishIdValue: number
  ): void {
    const dialogRef = this.dialog.open(
      DeleteDishFromBasketDialogDialog,
      {
        data: {
          dishId: dishIdValue,
          userId: this.dataService.getUserId()
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.dishesApiService
        .getDishesFromBasket(this.dataService.getUserId())
        .subscribe((result) => {
          this.dishesFromBasket = result;
          this.dishesApiService
            .getDishesFromBasketToDisplay(result)
            .subscribe((resultToDisplay) => {
              this.dishesFromBasketToDisplay = resultToDisplay.sort(
                this.dishesApiService.sortDishesByDishName
              );
            });
        });
    });
  }

  handleUpdateDishCountClick(
    dishId: number,
    dishCount: number
  ): void {
    if (dishCount >= 1 && dishCount <= 9) {
      this.dishesApiService
        .updateDishCount(
          dishId,
          dishCount,
          this.dataService.getUserId()
        )
        .subscribe(() => {
          this.dishesApiService
            .getDishesFromBasket(
              this.dataService.getUserId()
            )
            .subscribe((result) => {
              this.dishesFromBasket = result;
              this.dishesApiService
                .getDishesFromBasketToDisplay(result)
                .subscribe((resultToDisplay) => {
                  this.dishesFromBasketToDisplay = resultToDisplay.sort(
                    this.dishesApiService
                      .sortDishesByDishName
                  );
                });
            });
        });
    }
  }
}
