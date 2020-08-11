import { Component, OnInit } from '@angular/core';
import { TypesOfRestaurants } from '../../../../../features/restaurants/models/restaurant.model';
import { FilesApiService } from '../../../../../features/files/services/files-api.service';

@Component({
  selector: 'app-create-new-restaurant-dialog',
  templateUrl: './create-new-restaurant.dialog.html',
  styleUrls: ['./create-new-restaurant.dialog.sass']
})
export class CreateNewRestaurantDialog implements OnInit {
  restaurantImageFile: File | undefined;
  typesOfRestaurants = Object.keys(TypesOfRestaurants) as TypesOfRestaurants[];
  restaurantName: string | undefined;
  street: string | undefined;
  building: string | undefined;
  startWorkDay: string | undefined;
  endWorkDay: string | undefined;
  restaurantType: TypesOfRestaurants | undefined;

  constructor(private readonly filesApiService: FilesApiService) {}

  ngOnInit(): void {}

  createNewRestaurant(): void {
    // tslint:disable-next-line:no-console
    console.info(this.restaurantImageFile);
    // tslint:disable-next-line:no-console
    console.info(this.restaurantImageFile?.name);

    if (this.restaurantImageFile != undefined) {
      this.filesApiService.uploadFile(this.restaurantImageFile).subscribe((result) => {
        // tslint:disable-next-line:no-console
        console.info(result);
      });
    }
  }
}
