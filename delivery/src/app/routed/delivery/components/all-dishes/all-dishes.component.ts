import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { DishModel } from '../../models/dishes.model';
import { HttpClient } from '@angular/common/http';
import { DishFromBasketModel } from '../../models/dishes-from-basket.model';
import { MatDialog } from '@angular/material/dialog';
import { AddDishToOrderDialogDialog } from '../dialogs/add-dish-to-order-dialog/add-dish-to-order-dialog.dialog';

@Component({
  selector: 'app-all-dishes',
  templateUrl: './all-dishes.component.html',
  styleUrls: ['./all-dishes.component.sass']
})
export class AllDishesComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  allDishesList: DishModel[] = [];

  dishToAddToOrder = {} as DishFromBasketModel;

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog
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

  handleAddDishToOrderClick(id: number): void {
    this.dialog.open(AddDishToOrderDialogDialog, {
      data: {
        dishId: id
      }
    });
  }

  checkIfDishAlreadyInBasket(
    dishId: number,
    userId: number
  ): void {}
}
