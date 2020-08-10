import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel, RegisterOrderInputModel } from '../models/order.model';
import { from, Observable } from 'rxjs';
import { mergeMap, tap, toArray } from 'rxjs/operators';
import { DishesFromOrderToDisplayModel, DishFromOrderModel } from '../../dishes/models/dish.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {
  constructor(private readonly http: HttpClient) {}

  getDishesFromOrderToDisplay(dishesFromOrder: DishFromOrderModel[]): Observable<DishesFromOrderToDisplayModel[]> {
    return from(dishesFromOrder).pipe(
      mergeMap((dish) =>
        this.http
          .get<DishesFromOrderToDisplayModel>(`${environment.api}/dishes/${dish.dishId}`)
          .pipe(tap((result) => (result.count = dish.count)))
      ),
      toArray()
    );
  }

  getOrderByUserId(userId: number): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${environment.api}/orders/byUserId/${userId}`);
  }

  createOrder(input: RegisterOrderInputModel): Observable<RegisterOrderInputModel> {
    return this.http.post<RegisterOrderInputModel>(`${environment.api}/orders`, input);
  }
}
