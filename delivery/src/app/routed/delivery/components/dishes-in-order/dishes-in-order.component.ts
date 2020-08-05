import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';

import { from, Observable } from 'rxjs';
import {
  map,
  mergeMap,
  tap,
  toArray
} from 'rxjs/operators';
import { DishFromBasketModel } from '../../models/dishes-from-basket.model';
import { DishesFromBasketToDisplayModel } from '../../models/dishes-from-basket-to-display.model';
import { RegisterOrderDialogDialog } from '../dialogs/register-order-dialog/register-order-dialog.dialog';
import { DeleteDishFromOrderDialogDialog } from '../dialogs/delete-dish-from-order-dialog/delete-dish-from-order-dialog.dialog';
import { DeleteDishFromOrderDialogDataModel } from '../../models/delete-dish-from-order-dialog-data.model';
import { UpdateDishCountInputModel } from '../../models/update-dish-count-input.model';

@Component({
  selector: 'app-dishes-in-order',
  templateUrl: './dishes-in-order.component.html',
  styleUrls: ['./dishes-in-order.component.sass']
})
export class DishesInOrderComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  dishesFromBasket: DishFromBasketModel[] = [];

  dishesToDisplay: DishesFromBasketToDisplayModel[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshDishesFromBasketForUserId1();
  }

  refreshDishesFromBasketForUserId1(): void {
    this.http
      .get<DishFromBasketModel[]>(
        'http://127.0.0.1:8080/api/dishesFromBasket/1'
      )
      .subscribe((dishes) => {
        this.dishesFromBasket = dishes;
        console.log(
          'dishesFromBasket',
          this.dishesFromBasket
        );
        from(this.dishesFromBasket)
          .pipe(
            mergeMap((dish) =>
              this.http
                .get<DishesFromBasketToDisplayModel>(
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
            this.dishesToDisplay = allResponses;
            console.log(
              'dishesToDisplay',
              this.dishesToDisplay
            );
          });
      });
  }

  handleRegisterOrderClick(): void {
    this.dialog.open(RegisterOrderDialogDialog, {
      data: {
        dishes: this.dishesFromBasket
      }
    });
  }

  handleDeleteDishFromOrderClick(
    dishIdValue: number,
    userIdValue: number
  ): void {
    const dialogRef = this.dialog.open(
      DeleteDishFromOrderDialogDialog,
      {
        data: {
          dishId: dishIdValue,
          userId: userIdValue
        }
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.refreshDishesFromBasketForUserId1();
    });
  }

  changeDishCount(
    dishIdValue: number,
    userIdValue: number,
    dishCount: number
  ): void {
    const input: UpdateDishCountInputModel = {
      dishId: dishIdValue,
      userId: userIdValue,
      count: dishCount
    };
    console.log('input', input);
    this.http
      .request<DishFromBasketModel>(
        'put',
        `http://127.0.0.1:8080/api/dishesFromBasket`,
        { body: input }
      )
      .subscribe(
        () => {
          this.refreshDishesFromBasketForUserId1();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  handleChangeDishCountClick(
    dishIdValue: number,
    userIdValue: number,
    dishCount: number
  ): void {
    if (dishCount >= 1 && dishCount <= 9) {
      this.changeDishCount(
        dishIdValue,
        userIdValue,
        dishCount
      );
    }
  }
}
