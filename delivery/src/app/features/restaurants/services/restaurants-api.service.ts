import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {RestaurantModel, RestaurantModelForSend, RestaurantTypesModel} from '../models/restaurant.model';
import {Injectable} from '@angular/core';

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

  updateRestaurant(restaurantId: number, restaurantModel: RestaurantModelForSend): Observable<RestaurantModel> {
    return this.http.put<RestaurantModel>(`${environment.api}/restaurants/${restaurantId}`, restaurantModel);
  }

  getAllRestaurantsTypes(): Observable<RestaurantTypesModel[]> {
    return this.http.get<RestaurantTypesModel[]>(`${environment.api}/restaurants/types`);
  }
}
