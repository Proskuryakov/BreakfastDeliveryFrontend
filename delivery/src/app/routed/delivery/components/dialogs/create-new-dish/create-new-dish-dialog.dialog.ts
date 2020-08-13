import { Component, Directive, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesApiService } from '../../../../../features/files/services/files-api.service';
import { DishesApiService } from '../../../../../features/dishes/services/dishes-api.service';
import { DishModel, DishModelForSend, TypesOfDishes } from '../../../../../features/dishes/models/dish.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModelRestaurant } from '../../../../../features/restaurants/models/restaurant.model';
interface NewDishFromForm {
  dishImage: File;
  dishCalories: number;
  dishCookingTimeMinutes: number;
  dishType: string;
  dishName: string;
  dishPrice: number;
}

@Component({
  templateUrl: './create-new-dish-dialog.dialog.html',
  styleUrls: ['./create-new-dish-dialog.dialog.sass']
})
export class CreateNewDishDialogDialog implements OnInit {
  click = true;
  currState = '';
  private imageLink: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelRestaurant,
    private readonly http: HttpClient,
    private readonly filesApiService: FilesApiService,
    private readonly dishesApiService: DishesApiService
  ) {}
  typesOfDishes = Object.keys(TypesOfDishes) as TypesOfDishes[];
  dishType: TypesOfDishes | undefined;
  dishCookingTimeMinutes = '';
  dishPrice = '';
  dishName = '';
  dishCalories = '';
  hidden = true;
  createdDish: DishModel | undefined;
  dishImage: File | undefined;

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef no-any
  processFile(imageInput: any): void {
    this.dishImage = imageInput.files[0];
  }

  createNewDishBtn(value: NewDishFromForm): void {
    if (this.dishImage != undefined) {
      this.filesApiService.uploadFile(this.dishImage).subscribe(
        (res) => {},
        (err) => {
          this.imageLink = err.error.text;
          if (this.imageLink != undefined) {
            const input: DishModelForSend = {
              dishImage: this.imageLink,
              dishCalories: value.dishCalories,
              dishCookingTimeMinutes: value.dishCookingTimeMinutes,
              dishType: value.dishType,
              mainDishInfo: {
                dishName: value.dishName,
                dishPrice: value.dishPrice
              }
            };
            this.dishesApiService.createNewDish(this.data.id, input).subscribe((result) => {
              if (result != undefined) {
                this.click = false;
                this.hidden = true;
                this.createdDish = result;
                this.currState = 'Позиция успешно создана';
              } else {
                this.click = true;
                this.hidden = false;
                this.currState = 'Ошибка создания';
              }
            });
          }
        }
      );
    }
  }
}
