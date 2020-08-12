import { Component, Inject, OnInit } from '@angular/core';
import {
  RestaurantModel,
  RestaurantModelForSend,
  TypesOfRestaurants
} from '../../../../../features/restaurants/models/restaurant.model';
import { FilesApiService } from '../../../../../features/files/services/files-api.service';
import { RestaurantsApiService } from '../../../../../features/restaurants/services/restaurants-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './update-restaurant.dialog.html',
  styleUrls: ['./update-restaurant.dialog.sass']
})
export class UpdateRestaurantDialog implements OnInit {
  restaurantImageFile: File | undefined;
  typesOfRestaurants = Object.keys(TypesOfRestaurants) as TypesOfRestaurants[];
  updatedRestaurant: RestaurantModel | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RestaurantModel,
    private readonly filesApiService: FilesApiService,
    private readonly restaurantsApiService: RestaurantsApiService
  ) {}

  ngOnInit(): void {}

  processFile(imageInput: HTMLInputElement): void {
    this.restaurantImageFile = imageInput.files?.[0];
  }

  updateRestaurant(): void {
    if (this.restaurantImageFile != undefined) {
      this.filesApiService.uploadFile(this.restaurantImageFile).subscribe(
        (res) => {},
        (error) => {
          this.data.restaurantImage = error.error.text;
          this.updateRestaurantInner();
        }
      );
    } else {
      this.updateRestaurantInner();
    }
  }

  updateRestaurantInner(): void {
    const restaurantForSend: RestaurantModelForSend = {
      restaurantName: this.data.restaurantName,
      restaurantType: this.data.restaurantType,
      restaurantImage: this.data.restaurantImage,
      address: this.data.address,
      workingHours: this.data.workingHours
    };

    this.restaurantsApiService.updateRestaurant(this.data.id, restaurantForSend).subscribe((result) => {
      this.updatedRestaurant = result;
    });
  }
}
