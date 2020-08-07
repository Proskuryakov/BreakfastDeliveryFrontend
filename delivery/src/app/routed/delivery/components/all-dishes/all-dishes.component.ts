import { Component, OnInit } from '@angular/core';
import { DishModel } from '../../models/dishes.model';
import { HttpClient } from '@angular/common/http';
import { DishFromBasketModel } from '../../models/dishes-from-basket.model';
import { MatDialog } from '@angular/material/dialog';
import { AddDishToOrderDialogDialog } from '../dialogs/add-dish-to-order-dialog/add-dish-to-order-dialog.dialog';
import { DataService } from '../../../../data.service';
import { DishAlreadyInBasketDialogDialog } from '../dialogs/dish-already-in-basket-dialog/dish-already-in-basket-dialog.dialog';
import { DishIdDataModel } from '../../models/dish-id-data.model';

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
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllDishes();
  }

  private getAllDishes(): void {
    this.http
      .get<DishModel[]>('http://127.0.0.1:8080/api/dishes')
      .subscribe((result) => {
        this.allDishesList = result;
        this.allDishesList.sort((a, b) => {
          const nameA = a.mainDishInfo.dishName.toLowerCase();
          const nameB = b.mainDishInfo.dishName.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      });
  }

  handleAddDishToOrderClick(dishIdValue: number): void {
    const input: DishIdDataModel = {
      dishId: dishIdValue
    };
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
            this.dialog.open(AddDishToOrderDialogDialog, {
              data: {
                dishId: dishIdValue
              }
            });
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
}
