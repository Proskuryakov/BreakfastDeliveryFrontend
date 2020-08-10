import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DishModel, DishModelForSend, TypesOfDishes} from '../../../../../features/dishes/models/dish.model';
import {StatusesOfOrder} from "../../../../../features/orders/models/order.model";

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
  restrantId = '0';
  private imageLink: string | undefined;

  constructor(private readonly http: HttpClient) {

  }

  typesOfDishes = Object.keys(TypesOfDishes) as TypesOfDishes[];
  dishType: TypesOfDishes | undefined;
  dishCookingTimeMinutes = '56';
  dishPrice = 56;
  dishName = 'профитроли';
  dishCalories = 410;
  hidden = true;
  createdDish: DishModel | undefined;
  dishImage: File | undefined;

  ngOnInit(): void {

  }


  createNewDish(value: NewDishFromForm): void {
    console.info(value.dishImage);
    if (value.dishImage != undefined) {
      // const formData = new FormData();
      // formData.append('file', value.dishImage);
      // const uploadFilee = 'http://127.0.0.1:8080/api/storage/upload';
      // this.http.post(uploadFilee,  formData  )
      //   .subscribe(
      //     (res) => {
      //       if (res != undefined) {
      //         this.click = false;
      //         //  this.imageLink = res;
      //       }
      //     }
      //   );
      // if (this.imageLink != undefined) {
      const dishImageNull = 'Пустая ссылка';
      const input: DishModelForSend = {
        dishImage: dishImageNull,
        dishCalories: value.dishCalories,
        dishCookingTimeMinutes: value.dishCookingTimeMinutes,
        dishType: value.dishType,
        mainDishInfo: {
          dishName: value.dishName,
          dishPrice: value.dishPrice,
        },
      };
      const httpOptions2 = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
      const url = 'http://127.0.0.1:8080/api/restaurants/' + this.restrantId + '/dishes';
      this.http.post<DishModel>(url, input, httpOptions2)
        .subscribe(
          (result) => {
            if (result) {
              this.click = false;
              this.createdDish = result;
              this.currState = 'Позиция успешно создана';
            } else {
              this.click = false;
              this.currState = 'Ошибка создания';
            }
          }
        );
      //}
    }
  }
}
