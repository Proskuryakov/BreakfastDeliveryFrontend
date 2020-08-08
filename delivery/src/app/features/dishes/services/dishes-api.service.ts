import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DishesFromOrderToDisplayModel,
  DishFromBasketModel,
  DishFromOrderModel,
  DishModel,
  UpdateDishCountInputModel
} from '../models/dish.model';
import { from, Observable } from 'rxjs';
import { mergeMap, tap, toArray } from 'rxjs/operators';
import { OrdersApiService } from '../../orders/services/orders-api.service';
import { OrderModel } from '../../orders/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly ordersApiService: OrdersApiService
  ) {}

  getDishesFromBasket(
    userId: number
  ): Observable<DishFromBasketModel[]> {
    return this.http.get<DishFromBasketModel[]>(
      `http://127.0.0.1:8080/api/dishesFromBasket/${userId}`
    );
  }

  getDishesFromBasketToDisplay(
    dishesFromBasket: DishFromBasketModel[]
  ): Observable<DishesFromOrderToDisplayModel[]> {
    return from(dishesFromBasket).pipe(
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
    );
  }

  sortDishesByDishName(a: DishModel, b: DishModel): number {
    const nameA = a.mainDishInfo.dishName.toLowerCase();
    const nameB = b.mainDishInfo.dishName.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  clearBasketAndRefresh(
    date: string,
    order: OrderModel | undefined,
    dishesFromOrder: DishFromOrderModel[],
    dishesFromBasket: DishFromBasketModel[],
    dishesFromBasketToDisplay: DishesFromOrderToDisplayModel[],
    userId: number
  ): void {
    this.http
      .request<DishFromBasketModel>(
        'delete',
        `http://127.0.0.1:8080/api//dishesFromBasket/${userId}`
      )
      .subscribe(
        () => {
          this.getDishesFromBasketToDisplay(
            dishesFromBasket
          );
          this.ordersApiService.getOrderByUserId(userId);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  /*changeDishCount(
    dishesFromBasket: DishFromBasketModel[],
    dishesFromBasketToDisplay: DishesFromOrderToDisplayModel[],
    dishIdValue: number,
    dishCount: number,
    userIdValue: number
  ): void {
    const input: UpdateDishCountInputModel = {
      dishId: dishIdValue,
      userId: userIdValue,
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
          this.getDishesFromBasket(
            dishesFromBasket,
            dishesFromBasketToDisplay,
            userIdValue
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }*/

  getAllDishes(): Observable<DishModel[]> {
    return this.http.get<DishModel[]>(
      'http://127.0.0.1:8080/api/dishes'
    );
  }
}
