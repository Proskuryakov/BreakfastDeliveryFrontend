import { Component, Inject, OnInit } from '@angular/core';
import { DishFromBasketModel } from '../../../models/dishes-from-basket.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { AddDishToOrderDialogInputModel } from '../../../models/add-dish-to-order-dialog-input.model';

interface FormValue {
  dishCount: number;
}

@Component({
  templateUrl: './add-dish-to-order-dialog.dialog.html',
  styleUrls: ['./add-dish-to-order-dialog.dialog.sass']
})
export class AddDishToOrderDialogDialog implements OnInit {
  count = '';
  /*rateControl: FormControl | undefined;*/

  loading = false;

  constructor(
    private readonly http: HttpClient,
    @Inject(MAT_DIALOG_DATA)
    public data: AddDishToOrderDialogInputModel,
    private readonly dialogRef: MatDialogRef<
      AddDishToOrderDialogDialog,
      boolean
    >
  ) {}

  ngOnInit(): void {
    /*this.rateControl = new FormControl('', [
      Validators.max(10),
      Validators.min(0)
    ]);*/
  }

  handleAddDishToOrderClick(value: FormValue): void {
    this.loading = true;
    const input: DishFromBasketModel = {
      count: value.dishCount,
      dishId: this.data.dishId,
      userId: 1 // temporary
    };
    console.log('input', input);
    this.http
      .post<DishFromBasketModel>(
        `http://127.0.0.1:8080/api/dishesFromBasket`,
        input
      )
      .subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }

  addDishToOrder(): void {}
}
