import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RestaurantModel } from '../models/restaurant.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsApiService {
  constructor(private readonly http: HttpClient) {}

  getAllRestaurants(): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(`${environment.api}/api/restaurants`);
  }

  getRestaurant(restaurantId: number): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(`${environment.api}/api/restaurants/${restaurantId}`);
  }
}
