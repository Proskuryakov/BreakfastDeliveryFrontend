import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { DeleteOrAddDishToOrderDialogDataModel } from '../../../models/delete-or-add-dish-to-order-dialog-data.model';
import { DishFromBasketModel } from '../../../models/dishes-from-basket.model';
import { DataService } from '../../../../../data.service';
import { DishIdDataModel } from '../../../models/dish-id-data.model';

@Component({
  templateUrl:
    './delete-dish-from-order-dialog.dialog.html',
  styleUrls: [
    './delete-dish-from-order-dialog.dialog.sass'
  ],
  providers: [DataService]
})
export class DeleteDishFromOrderDialogDialog
  implements OnInit {
  loading = false;

  constructor(
    private readonly http: HttpClient,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA)
    public data: DishIdDataModel,
    private readonly dialogRef: MatDialogRef<
      DeleteDishFromOrderDialogDialog,
      boolean
    >
  ) {}

  ngOnInit(): void {}

  handleDeleteDishFromOrderClick(): void {
    this.loading = true;
    const input: DeleteOrAddDishToOrderDialogDataModel = {
      dishId: this.data.dishId,
      userId: this.dataService.getUserId()
    };
    console.log('input', input);
    this.http
      .request<DishFromBasketModel>(
        'delete',
        `http://127.0.0.1:8080/api/dishesFromBasket`,
        { body: input }
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
}
