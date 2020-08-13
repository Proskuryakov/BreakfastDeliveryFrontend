import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    console.log('dishes from order', dishesFromOrder);
    return from(dishesFromOrder).pipe(
      mergeMap((dish) =>
        this.http
          .get<DishesFromOrderToDisplayModel>(`${environment.api}/dishes/${dish.dishId}`)
          .pipe(tap((result) => (result.count = dish.count)))
      ),
      toArray()
    );
  }
  deleteOrderById(orderId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}/orders/${orderId}`);
  }
  getListCountOfCurrentOrders(): Observable<number[]> {
    return this.http.get<number[]>(`${environment.api}/orders/analysisOfOrders`);
  }
  // @ts-ignore
  // tslint:disable-next-line:no-any
  putNewStatus(orderId: number, newStatus: string): Observable<OrderModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<OrderModel>(`${environment.api}/orders/${orderId}`, { status: newStatus }, httpOptions);
  }
  getListOfOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${environment.api}/orders`);
  }

  getOrderByUserId(userId: string | null): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${environment.api}/orders/byUserId/${userId}`);
  }

  createOrder(input: RegisterOrderInputModel): Observable<RegisterOrderInputModel> {
    return this.http.post<RegisterOrderInputModel>(`${environment.api}/orders`, input);
  }
}
