export interface Restaurant {
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
