import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RestaurantModel, RestaurantModelForSend } from '../models/restaurant.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsApiService {
  constructor(private readonly http: HttpClient) {}

  getAllRestaurants(): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(`${environment.api}/restaurants`);
  }

  getRestaurant(restaurantId: number): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(`${environment.api}/restaurants/${restaurantId}`);
  }

  deleteRestaurant(restaurantId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}/restaurants/${restaurantId}`);
  }

  createRestaurant(restaurantModel: RestaurantModelForSend): Observable<RestaurantModel> {
    return this.http.post<RestaurantModel>(`${environment.api}/restaurants`, restaurantModel);
  }
}
