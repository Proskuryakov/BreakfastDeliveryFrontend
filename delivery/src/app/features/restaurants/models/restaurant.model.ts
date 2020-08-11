export interface RestaurantModel {
  id: number;
  restaurantName: string;
  restaurantType: string;
  address: {
    street: string;
    building: string;
  };
  workingHours: {
    startWorkDay: string;
    endWorkDay: string;
  };
  restaurantImage: string;
}

export interface DialogModelDeleteRestaurant {
  id: number;
  name: string;
}
