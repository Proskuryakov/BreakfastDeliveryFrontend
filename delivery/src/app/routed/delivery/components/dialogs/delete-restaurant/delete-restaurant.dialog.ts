import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModelDeleteRestaurant } from '../../../../../features/restaurants/models/restaurant.model';
import { RestaurantsApiService } from '../../../../../features/restaurants/services/restaurants-api.service';

@Component({
  selector: 'app-delete-restaurant',
  templateUrl: './delete-restaurant.dialog.html',
  styleUrls: ['./delete-restaurant.dialog.sass']
})
export class DeleteRestaurantDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelDeleteRestaurant,
    private readonly restaurantsApiService: RestaurantsApiService
  ) {}

  ngOnInit(): void {}

  deleteRestaurant(): void {
    this.restaurantsApiService.deleteRestaurant(this.data.id).subscribe();
  }
}
