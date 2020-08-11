import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestaurantModel } from '../../../../features/restaurants/models/restaurant.model';
import { RestaurantsApiService } from '../../../../features/restaurants/services/restaurants-api.service';

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.sass']
})
export class AllRestaurantsComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  allRestaurantList: RestaurantModel[] = [];

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly restaurantsApiService: RestaurantsApiService
  ) {}

  ngOnInit(): void {
    this.restaurantsApiService.getAllRestaurants().subscribe((result) => {
      this.allRestaurantList = result;
    });
  }

  handleWatchMenuClick(id: number): void {
    this.router.navigateByUrl(`/restaurants/${id}/dishes`);
  }
}
