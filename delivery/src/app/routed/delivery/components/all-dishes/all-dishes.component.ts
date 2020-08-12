import {Component, OnInit} from '@angular/core';
import {DishFromBasketModel, DishModel} from '../../../../features/dishes/models/dish.model';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {AddDishToBasketDialogDialog} from '../dialogs/add-dish-to-basket-dialog/add-dish-to-basket-dialog.dialog';
import {DataService} from '../../../../data.service';
import {DishAlreadyInBasketDialogDialog} from '../dialogs/dish-already-in-basket-dialog/dish-already-in-basket-dialog.dialog';
import {OrderAlreadyCreatedDialog} from '../dialogs/order-already-created/order-already-created.dialog';
import {DishesApiService} from '../../../../features/dishes/services/dishes-api.service';
import {OrdersApiService} from '../../../../features/orders/services/orders-api.service';

@Component({
  selector: 'app-all-dishes',
  templateUrl: './all-dishes.component.html',
  styleUrls: ['./all-dishes.component.sass'],
  providers: [DataService]
})
export class AllDishesComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  allDishesList: DishModel[] = [];

  dishToAddToOrder = {} as DishFromBasketModel;

  dishInBasket: DishFromBasketModel | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly dataService: DataService,
    private readonly dishesApiService: DishesApiService,
    private readonly ordersApiService: OrdersApiService
  ) {
  }

  redacphoto(): void {


  }

  ngOnInit(): void {
    this.dishesApiService.getAllDishes().subscribe((result) => {
      this.allDishesList = result.sort(this.dishesApiService.sortDishesByDishName);
    });
  }

  handleAddDishToOrderClick(dishIdValue: number): void {
    this.ordersApiService.getOrderByUserId(this.dataService.getUserId()).subscribe((order) => {
      if (order !== null) {
        this.dialog.open(OrderAlreadyCreatedDialog);
      } else {
        this.dishesApiService.getDishFromBasketByDishId(dishIdValue, this.dataService.getUserId()).subscribe(
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
