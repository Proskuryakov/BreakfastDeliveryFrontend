import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  DeleteOrAddDishToOrderDialogDataModel,
  DishesFromOrderToDisplayModel,
  DishFromBasketModel,
  DishIdDataModel,
  DishModel,
  DishModelForSend,
  UpdateDishCountInputModel
} from '../models/dish.model';
import { from, Observable } from 'rxjs';
import { mergeMap, tap, toArray } from 'rxjs/operators';
import { OrdersApiService } from '../../orders/services/orders-api.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  constructor(private readonly http: HttpClient, private readonly ordersApiService: OrdersApiService) {}

  getDishesFromBasket(userId: number): Observable<DishFromBasketModel[]> {
    return this.http.get<DishFromBasketModel[]>(`${environment.api}/dishesFromBasket/${userId}`);
  }

  createNewDish(restrantId: string, dishModel: DishModelForSend): Observable<DishModel> {
    const httpOptions2 = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<DishModel>(`${environment.api}/restaurants/${restrantId}/dishes`, dishModel, httpOptions2);
  }
  getDishByDishId(dishId: string): Observable<DishModel> {
    return this.http.get<DishModel>(`${environment.api}/dishes/${dishId}`);
  }

  getDishFromBasketByDishId(dishIdValue: number, userId: number): Observable<DishFromBasketModel> {
    const input: DishIdDataModel = {
      dishId: dishIdValue
    };
    return this.http.get<DishFromBasketModel>(`${environment.api}/dishesFromBasket/${userId}/${input.dishId}`);
  }

  getDishesFromBasketToDisplay(dishesFromBasket: DishFromBasketModel[]): Observable<DishesFromOrderToDisplayModel[]> {
    return from(dishesFromBasket).pipe(
      mergeMap((dish) =>
        this.http
          .get<DishesFromOrderToDisplayModel>(`${environment.api}/dishes/${dish.dishId}`)
          .pipe(tap((dishToDisplay) => (dishToDisplay.count = dish.count)))
      ),
      toArray()
    );
  }

  addDishToBasket(dishIdValue: number, userIdValue: number, countValue: number): Observable<DishFromBasketModel> {
    const input: DishFromBasketModel = {
      count: countValue,
      dishId: dishIdValue,
      userId: userIdValue
    };
    return this.http.post<DishFromBasketModel>(`${environment.api}/dishesFromBasket`, input);
  }

  clearBasket(userId: number): Observable<DishFromBasketModel> {
    return this.http.request<DishFromBasketModel>('delete', `${environment.api}/dishesFromBasket/${userId}`);
  }

  deleteDishFromBasket(dishIdValue: number, userIdValue: number): Observable<DishFromBasketModel> {
    const input: DeleteOrAddDishToOrderDialogDataModel = {
      dishId: dishIdValue,
      userId: userIdValue
    };
    return this.http.request<DishFromBasketModel>('delete', `${environment.api}/dishesFromBasket`, {
      body: input
    });
  }

  updateDishCount(dishIdValue: number, dishCount: number, userIdValue: number): Observable<DishFromBasketModel> {
    const input: UpdateDishCountInputModel = {
      dishId: dishIdValue,
      userId: userIdValue,
      count: dishCount
    };
    return this.http.request<DishFromBasketModel>('put', `${environment.api}/dishesFromBasket`, { body: input });
  }

  getAllDishes(): Observable<DishModel[]> {
    return this.http.get<DishModel[]>(`${environment.api}/dishes`);
  }

  getDishesInRestaurant(restaurantId: number): Observable<DishModel[]> {
    return this.http.get<DishModel[]>(`${environment.api}/restaurants/${restaurantId}/dishes`);
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
