import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../../../data.service';
import { DishIdDataModel } from '../../../../../features/dishes/models/dish.model';
import { DishesApiService } from '../../../../../features/dishes/services/dishes-api.service';

interface FormValue {
  dishCount: number;
}

@Component({
  templateUrl: './add-dish-to-basket-dialog.dialog.html',
  styleUrls: ['./add-dish-to-basket-dialog.dialog.sass'],
  providers: [DataService]
})
export class AddDishToBasketDialogDialog implements OnInit {
  count = '';

  loading = false;

  constructor(
    private readonly http: HttpClient,
    private readonly dataService: DataService,
    private readonly dishesApiService: DishesApiService,
    @Inject(MAT_DIALOG_DATA)
    private data: DishIdDataModel,
    private readonly dialogRef: MatDialogRef<AddDishToBasketDialogDialog, boolean>
  ) {}

  ngOnInit(): void {}

  handleAddDishToBasketClick(value: FormValue): void {
    this.loading = true;
    this.dishesApiService.addDishToBasket(this.data.dishId, this.dataService.getUserId(), value.dishCount).subscribe(
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
