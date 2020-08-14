import { Component, OnInit } from '@angular/core';
import {DishesApiService} from "../../../../features/dishes/services/dishes-api.service";
import {DishTypesModel} from "../../../../features/dishes/models/dish.model";
import {RestaurantsApiService} from "../../../../features/restaurants/services/restaurants-api.service";
import {RestaurantTypesModel} from "../../../../features/restaurants/models/restaurant.model";

@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.sass']
})
export class MainPage implements OnInit {
  dishesList: DishTypesModel[] = [];
  restaurantsList: RestaurantTypesModel[] = [];

  constructor(
    private readonly dishesApiService: DishesApiService,
    private readonly restaurantsApiService: RestaurantsApiService
  ) {}

  ngOnInit(): void {
    this.dishesApiService.getAllDishesTypes().subscribe((result) => {
      this.dishesList = result;
    });
    this.restaurantsApiService.getAllRestaurantsTypes().subscribe((result) => {
      this.restaurantsList = result;
    })
  }
}
