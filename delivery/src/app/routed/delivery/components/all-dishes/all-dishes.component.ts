import { Component, OnInit } from '@angular/core';
import {
  DishFromBasketModel,
  DishIdDataModel,
  DishModel
} from '../../../../features/dishes/models/dish.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddDishToOrderDialogDialog } from '../dialogs/add-dish-to-order-dialog/add-dish-to-order-dialog.dialog';
import { DataService } from '../../../../data.service';
import { DishAlreadyInBasketDialogDialog } from '../dialogs/dish-already-in-basket-dialog/dish-already-in-basket-dialog.dialog';
import { OrderModel } from '../../../../features/orders/models/order.model';
import { OrderAlreadyCreatedDialog } from '../dialogs/order-already-created/order-already-created.dialog';
import { DishesApiService } from '../../../../features/dishes/services/dishes-api.service';

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
    private readonly dishesApiService: DishesApiService
  ) {}

  ngOnInit(): void {
    this.dishesApiService
      .getAllDishes()
      .subscribe((result) => {
        this.allDishesList = result.sort(
          this.dishesApiService.sortDishesByDishName
        );
      });
  }

  handleAddDishToOrderClick(dishIdValue: number): void {
    const input: DishIdDataModel = {
      dishId: dishIdValue
    };
    this.http
      .get<OrderModel>(
        `http://127.0.0.1:8080/api/orders/byUserId/${this.dataService.getUserId()}`
      )
      .subscribe((order) => {
        if (order !== null) {
          this.dialog.open(OrderAlreadyCreatedDialog);
        } else {
          this.http
            .get<DishFromBasketModel>(
              `http://127.0.0.1:8080/api/dishesFromBasket/${this.dataService.getUserId()}/${
                input.dishId
              }`
            )
            .subscribe(
              (result) => {
                this.dishInBasket = result;
                if (
                  this.dishInBasket === undefined ||
                  this.dishInBasket === null
                ) {
                  this.dialog.open(
                    AddDishToOrderDialogDialog,
                    {
                      data: {
                        dishId: dishIdValue
                      }
                    }
                  );
                } else {
                  this.dialog.open(
                    DishAlreadyInBasketDialogDialog
                  );
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
