import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  DialogUpdateDIshModel, DishModel,
  DishModelForUpdateSend,
  TypesOfDishes
} from '../../../../../features/dishes/models/dish.model';
import {FilesApiService} from '../../../../../features/files/services/files-api.service';
import {DishesApiService} from '../../../../../features/dishes/services/dishes-api.service';

interface NewDishFromForm {
  dishImage: File;
  dishCalories: number;
  dishCookingTimeMinutes: number;
  dishType: string;
  dishName: string;
  dishPrice: number;
}

@Component({
  templateUrl: './update-dish-info-dialog.dialog.html',
  styleUrls: ['./update-dish-info-dialog.dialog.sass']
})
export class UpdateDishInfoDialogDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogUpdateDIshModel,
              private readonly filesApiService: FilesApiService,
              private readonly dishesApiService: DishesApiService) {
  }

  typesOfDishes = Object.keys(TypesOfDishes) as TypesOfDishes[];
  dishType: TypesOfDishes | undefined;
  dishCookingTimeMinutes: number | undefined;
  dishPrice: number | undefined;
  dishName: string | undefined;
  dishCalories: number | undefined;
  dishId = this.data.id;
  dishImage: File | undefined;
  private imageLink: string | undefined;
  click = true;
  currState = '';
  createdDish: DishModel | undefined;
  hidden = true;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:no-any
  processFile(imageInput: any): void {
    this.dishImage = imageInput.files[0];
  }


  updateDishInfo(value: NewDishFromForm): void {
    if (this.dishImage != undefined) {
      this.filesApiService.uploadFile(this.dishImage).subscribe(
        (res) => {
        },
        (err) => {
          this.imageLink = err.error.text;
          if (this.imageLink != undefined) {
            // @ts-ignore
            const input: DishModelForUpdateSend = {
              dishImage: this.imageLink,              // @ts-ignore
              dishCalories: this.dishCalories,              // @ts-ignore
              dishCookingTimeMinutes: this.dishCookingTimeMinutes,              // @ts-ignore
              dishType: this.dishType,
              dishName: this.dishName,
              // @ts-ignore
              dishPrice: this.dishPrice
            };
            this.dishesApiService.updateDishInfo(input, this.data.id).subscribe((result) => {
              if (result != undefined) {
                this.click = false;
                this.hidden = true;
                this.createdDish = result;
                this.currState = 'Позиция успешно обновлена';
              } else {
                this.click = true;
                this.hidden = false;
                this.currState = 'Ошибка обновления';
              }
            });
          }
        }
      );
    } else {
      const input: DishModelForUpdateSend = {      // @ts-ignore
        dishImage: undefined, // @ts-ignore
        dishCalories: this.dishCalories, // @ts-ignore
        dishCookingTimeMinutes: this.dishCookingTimeMinutes, // @ts-ignore
        dishType: this.dishType,
        dishName: this.dishName, // @ts-ignore
        dishPrice: this.dishPrice
      };
      this.dishesApiService.updateDishInfo(input, this.data.id).subscribe((result) => {
        if (result != undefined) {
          this.click = false;
          this.hidden = true;
          this.createdDish = result;
          this.currState = 'Позиция успешно обновлена';
        } else {
          this.click = true;
          this.hidden = false;
          this.currState = 'Ошибка обновления';
        }
      });
    }
  }
}
