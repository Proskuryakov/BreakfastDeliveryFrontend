import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from '../models/order.model';
import { from } from 'rxjs';
import { mergeMap, tap, toArray } from 'rxjs/operators';
import {
  DishesFromOrderToDisplayModel,
  DishFromOrderModel
} from '../../dishes/models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {
  constructor(private readonly http: HttpClient) {}

  getDishesFromOrder(
    order: OrderModel,
    dishesFromOrder: DishFromOrderModel[],
    dishesFromOrderToDisplay: DishesFromOrderToDisplayModel[]
  ): void {
    dishesFromOrder = order.listOfDishes;
    from(dishesFromOrder)
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
        dishesFromOrderToDisplay = allResponses;
        dishesFromOrderToDisplay.sort((a, b) => {
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

  getOrderByUserId(
    date: string,
    order: OrderModel | undefined,
    dishesFromOrder: DishFromOrderModel[],
    dishesFromOrderToDisplay: DishesFromOrderToDisplayModel[],
    userId: number
  ): void {
    this.http
      .get<OrderModel>(
        `http://127.0.0.1:8080/api/orders/byUserId/${userId}`
      )
      .subscribe((result) => {
        order = result;
        date = String(Number(order.createdAt) * 1000);
        this.getDishesFromOrder(
          order,
          dishesFromOrder,
          dishesFromOrderToDisplay
        );
      });
  }
}
