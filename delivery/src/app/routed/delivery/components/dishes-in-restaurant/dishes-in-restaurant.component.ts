import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../models/restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DishModel } from '../../../../features/dishes/models/dish.model';

@Component({
  selector: 'app-dishes-in-restaurant',
  templateUrl: './dishes-in-restaurant.component.html',
  styleUrls: ['./dishes-in-restaurant.component.sass']
})
export class DishesInRestaurantComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;
  dishesList: DishModel[] = [];
  selectedRestaurant?: Restaurant;
  restaurantId = 0;

  constructor(private readonly http: HttpClient, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((data) => (this.restaurantId = parseInt(data ?? '0', 10)));
    this.refreshSelectedRestaurant();
    this.refreshLists();
  }

  private refreshSelectedRestaurant(): void {
    this.http.get<Restaurant>('http://127.0.0.1:8080/api/restaurants/' + this.restaurantId).subscribe((result) => {
      this.selectedRestaurant = result;
    });
  }

  private refreshLists(): void {
    this.http
      .get<DishModel[]>('http://127.0.0.1:8080/api/restaurants/' + this.restaurantId + '/dishes')
      .subscribe((result) => {
        this.dishesList = result;
      });
  }
}
