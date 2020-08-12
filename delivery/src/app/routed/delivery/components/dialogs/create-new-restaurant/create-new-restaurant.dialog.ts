import { Component, OnInit } from '@angular/core';
import {
  RestaurantModel,
  RestaurantModelForSend,
  TypesOfRestaurants
} from '../../../../../features/restaurants/models/restaurant.model';
import { FilesApiService } from '../../../../../features/files/services/files-api.service';
import { RestaurantsApiService } from '../../../../../features/restaurants/services/restaurants-api.service';
interface NewRestaurantFormValue {
  restaurantName: string;
  street: string;
  building: string;
  startWorkDay: string;
  endWorkDay: string;
  restaurantType: TypesOfRestaurants;
}

@Component({
  templateUrl: './create-new-restaurant.dialog.html',
  styleUrls: ['./create-new-restaurant.dialog.sass']
})
export class CreateNewRestaurantDialog implements OnInit {
  restaurantImageFile: File | undefined;
  restaurantImage: string | undefined;
  typesOfRestaurants = Object.keys(TypesOfRestaurants) as TypesOfRestaurants[];

  restaurantName = '';
  street = '';
  building = '';
  startWorkDay = '';
  endWorkDay = '';

  restaurantType: TypesOfRestaurants | undefined;
  createdRestaurant: RestaurantModel | undefined;

  constructor(
    private readonly filesApiService: FilesApiService,
    private readonly restaurantsApiService: RestaurantsApiService
  ) {}

  ngOnInit(): void {}

  createNewRestaurant(formValue: NewRestaurantFormValue): void {
    if (this.restaurantImageFile != undefined) {
      this.filesApiService.uploadFile(this.restaurantImageFile).subscribe(
        (res) => {},
        (error) => {
          this.restaurantImage = error.error.text;
          if (this.restaurantImage != undefined) {
            const restaurant: RestaurantModelForSend = {
              restaurantName: formValue.restaurantName,
              restaurantType: formValue.restaurantType,
              restaurantImage: this.restaurantImage,
              address: {
                street: formValue.street,
                building: formValue.building
              },
              workingHours: {
                startWorkDay: formValue.startWorkDay,
                endWorkDay: formValue.endWorkDay
              }
            };

            this.restaurantsApiService.createRestaurant(restaurant).subscribe((result) => {
              this.createdRestaurant = result;
            });
          }
        }
      );
    }
  }

  processFile(imageInput: HTMLInputElement): void {
    this.restaurantImageFile = imageInput.files?.[0];
  }
}
