import { Component, OnInit } from '@angular/core';
import { DishModel } from '../../../../features/dishes/models/dish.model';
import { RestaurantModel } from '../../../../features/restaurants/models/restaurant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../data.service';
import { RestaurantsApiService } from '../../../../features/restaurants/services/restaurants-api.service';
import { DishesApiService } from '../../../../features/dishes/services/dishes-api.service';
import { OrdersApiService } from '../../../../features/orders/services/orders-api.service';
import { switchMap } from 'rxjs/operators';
import { CreateNewDishDialogDialog } from '../dialogs/create-new-dish/create-new-dish-dialog.dialog';

@Component({
  selector: 'app-admin-dishes-in-restaurant',
  templateUrl: './admin-dishes-in-restaurant.component.html',
  styleUrls: ['./admin-dishes-in-restaurant.component.sass']
})
export class AdminDishesInRestaurantComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;
  dishesList: DishModel[] = [];
  selectedRestaurant?: RestaurantModel;
  restaurantId = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private readonly dialog: MatDialog,
    private readonly dataService: DataService,
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

  goToRestaurantManagement(): void {
    this.router.navigateByUrl(`/admin/restaurants`);
  }

  openCreateDishDialog(): void {
    this.dialog.afterAllClosed.subscribe();
    this.dialog.open(CreateNewDishDialogDialog, {
      data: {
        id: this.restaurantId,
        name: this.selectedRestaurant?.restaurantName
      }
    });
  }
}
