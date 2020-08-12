import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {DishesApiService} from '../../../../../features/dishes/services/dishes-api.service';
import {DialogUpdateDIshModel} from '../../../../../features/dishes/models/dish.model';

@Component({
  templateUrl: './delete-dish-from-restaurant-dialog.dialog.html',
  styleUrls: ['./delete-dish-from-restaurant-dialog.dialog.sass']
})
export class DeleteDishFromRestaurantDialogDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogUpdateDIshModel,
              private readonly dishApiService: DishesApiService) { }
  click = true;
  nextStage = '';
  clickBtn = false;
  idDish: string = this.data.id;

  ngOnInit(): void {
  }
  deleteDish(): void {
    if (this.idDish != undefined) {

      this.dishApiService.deleteDishById(this.idDish).subscribe(
        (res) => {
          // tslint:disable-next-line:no-console
          console.info(res);
          if (res) {
            this.click = false;
            this.clickBtn = true;
            this.nextStage = 'Позиция успешно удалена';
          } else {
            this.click = false;
            this.clickBtn = false;
            this.nextStage = 'Позицию не удалось удалить';
          }
        },
        // tslint:disable-next-line:no-unused-expression no-any
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
