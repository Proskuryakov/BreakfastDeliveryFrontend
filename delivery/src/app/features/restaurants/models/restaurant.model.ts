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

export enum TypesOfRestaurants {
  BAR = 'BAR',
  PIZZERIA = 'PIZZERIA',
  BURGER = 'BURGER',
  DUMPLINGS = 'DUMPLINGS',
  SUSHI = 'SUSHI',
  BAKERY = 'BAKERY',
  RUSSIAN = 'RUSSIAN',
  ITALIAN = 'ITALIAN',
  CHINESE = 'CHINESE',
  GEORGIAN = 'GEORGIAN',
  ARMENIAN = 'ARMENIAN',
  COMMON = 'COMMON'
}
