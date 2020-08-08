import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DeleteOrAddDishToOrderDialogDataModel,
  DishesFromOrderToDisplayModel,
  DishFromBasketModel,
  DishFromOrderModel,
  DishIdDataModel,
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

  getDishFromBasketByDishId(
    dishIdValue: number,
    userId: number
  ): Observable<DishFromBasketModel> {
    const input: DishIdDataModel = {
      dishId: dishIdValue
    };
    return this.http.get<DishFromBasketModel>(
      `http://127.0.0.1:8080/api/dishesFromBasket/${userId}/${input.dishId}`
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

  addDishToBasket(
    dishIdValue: number,
    userIdValue: number,
    countValue: number
  ): Observable<DishFromBasketModel> {
    const input: DishFromBasketModel = {
      count: countValue,
      dishId: dishIdValue,
      userId: userIdValue
    };
    return this.http.post<DishFromBasketModel>(
      `http://127.0.0.1:8080/api/dishesFromBasket`,
      input
    );
  }

  clearBasket(
    userId: number
  ): Observable<DishFromBasketModel> {
    return this.http.request<DishFromBasketModel>(
      'delete',
      `http://127.0.0.1:8080/api//dishesFromBasket/${userId}`
    );
  }

  deleteDishFromBasket(
    dishIdValue: number,
    userIdValue: number
  ): Observable<DishFromBasketModel> {
    const input: DeleteOrAddDishToOrderDialogDataModel = {
      dishId: dishIdValue,
      userId: userIdValue
    };
    return this.http.request<DishFromBasketModel>(
      'delete',
      `http://127.0.0.1:8080/api/dishesFromBasket`,
      { body: input }
    );
  }

  updateDishCount(
    dishIdValue: number,
    dishCount: number,
    userIdValue: number
  ): Observable<DishFromBasketModel> {
    const input: UpdateDishCountInputModel = {
      dishId: dishIdValue,
      userId: userIdValue,
      count: dishCount
    };
    return this.http.request<DishFromBasketModel>(
      'put',
      `http://127.0.0.1:8080/api/dishesFromBasket`,
      { body: input }
    );
  }

  getAllDishes(): Observable<DishModel[]> {
    return this.http.get<DishModel[]>(
      'http://127.0.0.1:8080/api/dishes'
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
}
