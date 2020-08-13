import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantModel } from '../../../../features/restaurants/models/restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DishFromBasketModel, DishModel } from '../../../../features/dishes/models/dish.model';
import { RestaurantsApiService } from '../../../../features/restaurants/services/restaurants-api.service';
import { DishesApiService } from '../../../../features/dishes/services/dishes-api.service';
import { OrderAlreadyCreatedDialog } from '../dialogs/orders/order-already-created/order-already-created.dialog';
import { AddDishToBasketDialogDialog } from '../dialogs/dishes/add-dish-to-basket-dialog/add-dish-to-basket-dialog.dialog';
import { DishAlreadyInBasketDialogDialog } from '../dialogs/dishes/dish-already-in-basket-dialog/dish-already-in-basket-dialog.dialog';
import { OrdersApiService } from '../../../../features/orders/services/orders-api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dishes-in-restaurant',
  templateUrl: './dishes-in-restaurant.component.html',
  styleUrls: ['./dishes-in-restaurant.component.sass']
})
export class DishesInRestaurantComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;
  role = localStorage.getItem('role');
  dishesList: DishModel[] = [];
  selectedRestaurant?: RestaurantModel;
  restaurantId = 0;

  dishInBasket: DishFromBasketModel | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly restaurantsApiService: RestaurantsApiService,
    private readonly dishesApiService: DishesApiService,
    private readonly ordersApiService: OrdersApiService
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

  handleAddDishToOrderClick(dishIdValue: number): void {
    this.ordersApiService.getOrderByUserId(localStorage.getItem('id')).subscribe((order) => {
      if (order !== null) {
        this.dialog.open(OrderAlreadyCreatedDialog);
      } else {
        this.dishesApiService.getDishFromBasketByDishId(dishIdValue, localStorage.getItem('id')).subscribe(
          (result) => {
            this.dishInBasket = result;
            if (this.dishInBasket === undefined || this.dishInBasket === null) {
              this.dialog.open(AddDishToBasketDialogDialog, {
                data: {
                  dishId: dishIdValue
                }
              });
            } else {
              this.dialog.open(DishAlreadyInBasketDialogDialog);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
}
