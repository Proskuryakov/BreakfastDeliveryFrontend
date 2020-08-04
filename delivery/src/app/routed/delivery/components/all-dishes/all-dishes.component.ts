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
      });
  }

  handleAddDishToOrderClick(): void {
    this.dialog.open(AddDishToOrderDialogDialog);
  }
}
