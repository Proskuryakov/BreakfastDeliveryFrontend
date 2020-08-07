import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { DataService } from '../../../../../data.service';
import {
  DishFromBasketModel,
  DishIdDataModel
} from '../../../../../features/dishes/models/dish.model';

interface FormValue {
  dishCount: number;
}

@Component({
  templateUrl: './add-dish-to-order-dialog.dialog.html',
  styleUrls: ['./add-dish-to-order-dialog.dialog.sass'],
  providers: [DataService]
})
export class AddDishToOrderDialogDialog implements OnInit {
  count = '';

  loading = false;

  constructor(
    private readonly http: HttpClient,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA)
    public data: DishIdDataModel,
    private readonly dialogRef: MatDialogRef<
      AddDishToOrderDialogDialog,
      boolean
    >
  ) {}

  ngOnInit(): void {}

  handleAddDishToOrderClick(value: FormValue): void {
    this.loading = true;
    const input: DishFromBasketModel = {
      count: value.dishCount,
      dishId: this.data.dishId,
      userId: this.dataService.getUserId()
    };
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
