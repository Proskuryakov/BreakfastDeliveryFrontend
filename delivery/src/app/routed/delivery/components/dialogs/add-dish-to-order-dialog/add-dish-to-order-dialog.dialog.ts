import { Component, OnInit } from '@angular/core';
import { DishFromBasketModel } from '../../../models/dishes-from-basket.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-dish-to-order-dialog.dialog.html',
  styleUrls: ['./add-dish-to-order-dialog.dialog.sass']
})
export class AddDishToOrderDialogDialog implements OnInit {
  count = '';
  /*rateControl: FormControl | undefined;*/

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    /*this.rateControl = new FormControl('', [
      Validators.max(10),
      Validators.min(0)
    ]);*/
  }

  handleAddDishToOrderClick(dishCount: number): void {
    const input: DishFromBasketModel = {
      count: dishCount,
      dishId: 1, // temporary
      userId: 1 // temporary
    };
    this.http
      .post<DishFromBasketModel>(
        `http://127.0.0.1:8080/api/dishesFromBasket/`,
        {}
      )
      .subscribe((result) => {});
  }

  addDishToOrder(): void {}
}
