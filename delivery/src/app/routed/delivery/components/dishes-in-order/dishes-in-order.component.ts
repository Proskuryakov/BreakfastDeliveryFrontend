import { Component, Input, OnInit } from '@angular/core';
import { DishModel } from '../../models/dishes.model';
import { HttpClient } from '@angular/common/http';
import { DishFromBasketModel } from '../../models/dishesfrombasket.model';
import { RegisterOrderDialogDialog } from '../register-order-dialog/register-order-dialog.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dishes-in-order',
  templateUrl: './dishes-in-order.component.html',
  styleUrls: ['./dishes-in-order.component.sass']
})
export class DishesInOrderComponent implements OnInit {
  @Input()
  orderDishesList: DishFromBasketModel[] = [];

  dishesFromBasket: DishFromBasketModel[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDishesFromBasket();
  }

  private getDishesFromBasket(): void {
    this.http
      .get<DishFromBasketModel[]>(
        'http://127.0.0.1:8080/api/dishesfrombasket'
      )
      .subscribe((result) => {
        this.dishesFromBasket = result;
      });
  }

  handleRegisterOrderClick(): void {
    this.dialog.open(RegisterOrderDialogDialog);
  }
}
