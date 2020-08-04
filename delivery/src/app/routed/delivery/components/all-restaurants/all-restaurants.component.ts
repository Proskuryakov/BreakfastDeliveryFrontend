import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.sass']
})
export class AllRestaurantsComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  allRestaurantList: Restaurant[] = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.refreshLists();
  }

  private refreshLists(): void {
    this.http.get<Restaurant[]>('http://127.0.0.1:8080/api/restaurants').subscribe((result) => {
      this.allRestaurantList = result;
    });
  }
}
