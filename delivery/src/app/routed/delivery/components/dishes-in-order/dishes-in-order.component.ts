import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { from } from 'rxjs';
import { mergeMap, tap, toArray } from 'rxjs/operators';
import { DishFromBasketModel } from '../../models/dishes-from-basket.model';
import { DishesFromOrderToDisplayModel } from '../../models/dishes-from-order-to-display.model';
import { RegisterOrderDialogDialog } from '../dialogs/register-order-dialog/register-order-dialog.dialog';
import { DeleteDishFromOrderDialogDialog } from '../dialogs/delete-dish-from-order-dialog/delete-dish-from-order-dialog.dialog';
import { UpdateDishCountInputModel } from '../../models/update-dish-count-input.model';
import { DataService } from '../../../../data.service';
import { OrderModel } from '../../models/order.model';
import { DishFromOrderModel } from '../../models/dish-from-order.model';

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

  order: OrderModel | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getDishesFromBasket();
    this.getOrderByUserId(this.dataService.getUserId());
  }

  private getDishesFromBasket(): void {
    this.http
      .get<DishFromBasketModel[]>(
        `http://127.0.0.1:8080/api/dishesFromBasket/${this.dataService.getUserId()}`
      )
      .subscribe((dishes) => {
        this.dishesFromBasket = dishes;
        from(this.dishesFromBasket)
          .pipe(
            mergeMap((dish) =>
              this.http
                .get<DishesFromOrderToDisplayModel>(
                  `http://127.0.0.1:8080/api/dishes/${dish.dishId}`
                )
                .pipe(
                  tap(
                    (dishToDisplay) =>
                      (dishToDisplay.count = dish.count)
                  )
                )
            ),
            toArray()
          )
          .subscribe((allResponses) => {
            this.dishesFromBasketToDisplay = allResponses;
            this.dishesFromBasketToDisplay.sort((a, b) => {
              const nameA = a.mainDishInfo.dishName.toLowerCase();
              const nameB = b.mainDishInfo.dishName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
          });
      });
  }

  private getDishesFromOrder(order: OrderModel): void {
    console.log(
      'list of dishes from order',
      order.listOfDishes
    );
    this.dishesFromOrder = order.listOfDishes;
    from(this.dishesFromOrder)
      .pipe(
        mergeMap((dish) =>
          this.http
            .get<DishesFromOrderToDisplayModel>(
              `http://127.0.0.1:8080/api/dishes/${dish.dishId}`
            )
            .pipe(
              tap(
                (dishToDisplay) =>
                  (dishToDisplay.count = dish.count)
              )
            )
        ),
        toArray()
      )
      .subscribe((allResponses) => {
        this.dishesFromOrderToDisplay = allResponses;
        this.dishesFromOrderToDisplay.sort((a, b) => {
          const nameA = a.mainDishInfo.dishName.toLowerCase();
          const nameB = b.mainDishInfo.dishName.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      });
  }

  private clearBasketAndRefresh(): void {
    this.http
      .request<DishFromBasketModel>(
        'delete',
        `http://127.0.0.1:8080/api//dishesFromBasket/${this.dataService.getUserId()}`
      )
      .subscribe(
        () => {
          this.getDishesFromBasket();
          this.getOrderByUserId(
            this.dataService.getUserId()
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }

  private changeDishCount(
    dishIdValue: number,
    dishCount: number
  ): void {
    const input: UpdateDishCountInputModel = {
      dishId: dishIdValue,
      userId: this.dataService.getUserId(),
      count: dishCount
    };
    this.http
      .request<DishFromBasketModel>(
        'put',
        `http://127.0.0.1:8080/api/dishesFromBasket`,
        { body: input }
      )
      .subscribe(
        () => {
          this.getDishesFromBasket();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  private getOrderByUserId(userId: number): void {
    this.http
      .get<OrderModel>(
        `http://127.0.0.1:8080/api/orders/byUserId/${userId}`
      )
      .subscribe((result) => {
        this.order = result;
        this.getDishesFromOrder(this.order);
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
    dialogRef.afterClosed().subscribe(() => {
      this.clearBasketAndRefresh();
    });
  }

  handleDeleteDishFromOrderClick(
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
      this.getDishesFromBasket();
    });
  }

  handleChangeDishCountClick(
    dishId: number,
    dishCount: number
  ): void {
    if (dishCount >= 1 && dishCount <= 9) {
      this.changeDishCount(dishId, dishCount);
    }
  }
}
