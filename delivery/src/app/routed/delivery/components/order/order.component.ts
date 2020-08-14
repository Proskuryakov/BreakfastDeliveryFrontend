import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RegisterOrderDialogDialog } from '../dialogs/orders/register-order-dialog/register-order-dialog.dialog';
import { DeleteDishFromBasketDialogDialog } from '../dialogs/dishes/delete-dish-from-basket-dialog/delete-dish-from-basket-dialog.dialog';
import { OrderModel } from '../../../../features/orders/models/order.model';
import {
  DishesFromOrderToDisplayModel,
  DishFromBasketModel,
  DishFromOrderModel
} from '../../../../features/dishes/models/dish.model';
import { DishesApiService } from '../../../../features/dishes/services/dishes-api.service';
import { OrdersApiService } from '../../../../features/orders/services/orders-api.service';
import { CancelOrderDialogDialog } from '../dialogs/orders/cancel-order-dialog/cancel-order-dialog.dialog';
import { RestaurantModel } from '../../../../features/restaurants/models/restaurant.model';
import { RestaurantsApiService } from '../../../../features/restaurants/services/restaurants-api.service';

@Component({
  selector: 'app-dishes-in-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  dishesFromBasket: DishFromBasketModel[] = [];

  dishesFromBasketToDisplay: DishesFromOrderToDisplayModel[] = [];

  dishesFromOrder: DishFromOrderModel[] = [];

  dishesFromOrderToDisplay: DishesFromOrderToDisplayModel[] = [];

  private allRestaurant: RestaurantModel[] | undefined;

  order: OrderModel | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly dishesApiService: DishesApiService,
    private readonly orderApiService: OrdersApiService,
    private readonly restaurantsApiService: RestaurantsApiService
  ) {}

  ngOnInit(): void {
    this.getRestaurant();
    this.dishesApiService.getDishesFromBasket(localStorage.getItem('id')).subscribe((result) => {
      this.dishesFromBasket = result;
      this.dishesApiService.getDishesFromBasketToDisplay(result).subscribe((resultToDisplay) => {
        this.dishesFromBasketToDisplay = resultToDisplay.sort(this.dishesApiService.sortDishesByDishName);
      });
    });
    this.orderApiService.getOrderByUserId(localStorage.getItem('id')).subscribe((resultOrder) => {
      this.order = resultOrder;
      if (this.order !== null) {
        this.dishesFromOrder = resultOrder.listOfDishes;
        console.log('dishes from order', this.dishesFromOrder);
        this.order.createdAt = String(Number(this.order.createdAt) * 1000);
        this.orderApiService.getDishesFromOrderToDisplay(this.dishesFromOrder).subscribe((resultDishes) => {
          this.dishesFromOrderToDisplay = resultDishes.sort(this.dishesApiService.sortDishesByDishName);
        });
      }
    });
  }

  handleRegisterOrderClick(): void {
    const dialogRef = this.dialog.open(RegisterOrderDialogDialog, {
      data: {
        dishes: this.dishesFromBasket
      }
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.dishesApiService.clearBasket(localStorage.getItem('id')).subscribe(() => {
          this.dishesFromBasket = [];
          this.dishesApiService.getDishesFromBasket(localStorage.getItem('id')).subscribe((result) => {
            this.dishesApiService.getDishesFromBasketToDisplay(result).subscribe((resultToDisplay) => {
              this.dishesFromBasketToDisplay = resultToDisplay.sort(this.dishesApiService.sortDishesByDishName);
              this.orderApiService.getOrderByUserId(localStorage.getItem('id')).subscribe((orderResult) => {
                this.order = orderResult;
                this.dishesFromOrder = orderResult.listOfDishes;
                this.order.createdAt = String(Number(this.order.createdAt) * 1000);
                this.orderApiService.getDishesFromOrderToDisplay(this.dishesFromOrder).subscribe((resultDishes) => {
                  this.dishesFromOrderToDisplay = resultDishes.sort(this.dishesApiService.sortDishesByDishName);
                });
              });
            });
          });
        });
      }
    });
  }

  handleDeleteDishFromBasketClick(dishIdValue: number): void {
    const dialogRef = this.dialog.open(DeleteDishFromBasketDialogDialog, {
      data: {
        dishId: dishIdValue,
        userId: localStorage.getItem('id')
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dishesApiService.getDishesFromBasket(localStorage.getItem('id')).subscribe((result) => {
        this.dishesFromBasket = result;
        this.dishesApiService.getDishesFromBasketToDisplay(result).subscribe((resultToDisplay) => {
          this.dishesFromBasketToDisplay = resultToDisplay.sort(this.dishesApiService.sortDishesByDishName);
        });
      });
    });
  }

  handleUpdateDishCountClick(dishId: number, dishCount: number): void {
    if (dishCount >= 1 && dishCount <= 9) {
      this.dishesApiService.updateDishCount(dishId, dishCount, localStorage.getItem('id')).subscribe(() => {
        this.dishesApiService.getDishesFromBasket(localStorage.getItem('id')).subscribe((result) => {
          this.dishesFromBasket = result;
          this.dishesApiService.getDishesFromBasketToDisplay(result).subscribe((resultToDisplay) => {
            this.dishesFromBasketToDisplay = resultToDisplay.sort(this.dishesApiService.sortDishesByDishName);
          });
        });
      });
    }
  }

  handleCancelOrderClick(orderId: number): void {
    const dialogRef = this.dialog.open(CancelOrderDialogDialog);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.orderApiService.putNewStatus(orderId, 'ORDER_CANCELLED').subscribe(() => {
          if (this.order !== undefined) {
            this.order.status = 'ORDER_CANCELLED';
          }
        });
      }
    });
  }

  getPhotoOfRestaurant(id: number): string {
    // tslint:disable-next-line:label-position
    const imagelink = '';
    if (this.allRestaurant != undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.allRestaurant.length; i++) {
        if (id === this.allRestaurant[i].id) {
          return this.allRestaurant[i].restaurantImage;
          // tslint:disable-next-line:align
        }
      }
      // tslint:disable-next-line:align
    }
    return '';
  }

  getRestaurant(): void {
    this.restaurantsApiService.getAllRestaurants().subscribe((result) => {
      this.allRestaurant = result;
    });
  }
}
