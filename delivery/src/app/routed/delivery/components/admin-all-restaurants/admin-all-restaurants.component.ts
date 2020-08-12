import { Component, OnInit } from '@angular/core';
import { RestaurantModel } from '../../../../features/restaurants/models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestaurantsApiService } from '../../../../features/restaurants/services/restaurants-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewRestaurantDialog } from '../dialogs/create-new-restaurant/create-new-restaurant.dialog';
import { DeleteRestaurantDialog } from '../dialogs/delete-restaurant/delete-restaurant.dialog';
import { CreateNewDishDialogDialog } from '../dialogs/create-new-dish/create-new-dish-dialog.dialog';

@Component({
  selector: 'app-admin-all-restaurants',
  templateUrl: './admin-all-restaurants.component.html',
  styleUrls: ['./admin-all-restaurants.component.sass']
})
export class AdminAllRestaurantsComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  allRestaurantList: RestaurantModel[] = [];

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private readonly restaurantsApiService: RestaurantsApiService,
    private readonly createRestaurantDialog: MatDialog,
    private readonly deleteRestaurantDialog: MatDialog,
    private readonly createDishDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.restaurantsApiService.getAllRestaurants().subscribe((result) => {
      this.allRestaurantList = result;
    });
  }

  handleUpdateRestaurantClick(id: number): void {}

  handleDeleteRestaurantClick(restaurantId: number, restaurantName: string): void {
    this.deleteRestaurantDialog.afterAllClosed.subscribe((data) => this.ngOnInit());
    this.deleteRestaurantDialog.open(DeleteRestaurantDialog, {
      data: {
        id: restaurantId,
        name: restaurantName
      }
    });
  }

  openCreateDishDialog(restaurantId: number, restaurantName: string): void {
    this.createDishDialog.afterAllClosed.subscribe();
    this.createDishDialog.open(CreateNewDishDialogDialog, {
      data: {
        id: restaurantId,
        name: restaurantName
      }
    });
  }

  handleWatchMenuClick(id: number): void {
    this.router.navigateByUrl(`/restaurants/${id}/dishes`);
  }

  openCreateRestaurantDialog(): void {
    this.createRestaurantDialog.afterAllClosed.subscribe((data) => this.ngOnInit());
    this.createRestaurantDialog.open(CreateNewRestaurantDialog);
  }
}
