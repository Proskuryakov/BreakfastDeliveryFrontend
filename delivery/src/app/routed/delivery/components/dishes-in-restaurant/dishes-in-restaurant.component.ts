import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantModel } from '../../../../features/restaurants/models/restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DishModel } from '../../../../features/dishes/models/dish.model';
import { RestaurantsApiService } from '../../../../features/restaurants/services/restaurants-api.service';
import { DishesApiService } from '../../../../features/dishes/services/dishes-api.service';

@Component({
  selector: 'app-dishes-in-restaurant',
  templateUrl: './dishes-in-restaurant.component.html',
  styleUrls: ['./dishes-in-restaurant.component.sass']
})
export class DishesInRestaurantComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;
  dishesList: DishModel[] = [];
  selectedRestaurant?: RestaurantModel;
  restaurantId = 0;

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly restaurantsApiService: RestaurantsApiService,
    private readonly dishesApiService: DishesApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((data) => (this.restaurantId = parseInt(data ?? '0', 10)));

    this.restaurantsApiService.getRestaurant(this.restaurantId).subscribe((result) => {
      this.selectedRestaurant = result;
    });

    this.dishesApiService.getDishesInRestaurant(this.restaurantId).subscribe((result) => {
      this.dishesList = result.sort(this.dishesApiService.sortDishesByDishName);
    });
  }
}
