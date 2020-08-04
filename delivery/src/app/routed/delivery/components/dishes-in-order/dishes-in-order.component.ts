import { Component, Input, OnInit } from '@angular/core';
import { DishModel } from '../../models/dishes.model';
import { HttpClient } from '@angular/common/http';
import { DishFromBasketModel } from '../../models/dishes-from-basket.model';
import { RegisterOrderDialogDialog } from '../dialogs/register-order-dialog/register-order-dialog.dialog';
import { MatDialog } from '@angular/material/dialog';
import { DishesFromBasketToDisplayModel } from '../../models/dishes-from-basket-to-display.model';
import { from, Observable } from 'rxjs';
import {
  map,
  mergeMap,
  tap,
  toArray
} from 'rxjs/operators';

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
    this.getDishesFromBasketForUserId1();
    // this.getDishesToDisplay();
  }

  private getDishesFromBasketForUserId1(): void {
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

  /*private getDishesToDisplay(): void {
    this.dishesFromBasket.forEach(dish =>
      this.http
        .get<DishModel>(
          `http://127.0.0.1:8080/api/dishes/${dish.dishId}`
        )
        .subscribe((result) => {
          this.dishesToDisplay.push(result);
          console.log('dishes array', this.dishesToDisplay);
        })
    );
  }*/

  handleRegisterOrderClick(): void {
    this.dialog.open(RegisterOrderDialogDialog, {
      data: {
        dishes: this.dishesFromBasket
      }
    });
  }

  handleDeleteDishFromOrderClick(dishId: number): void {}
}
