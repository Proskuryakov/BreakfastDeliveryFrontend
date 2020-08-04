import { DishFromBasketModel } from './dishes-from-basket.model';

export interface RegisterOrderInputModel {
  phone: string;
  address: {
    city: string;
    street: string;
    house: string;
    flat: string;
    entrance: string;
    floor: string;
  };
  listOfDishes: DishFromBasketModel[];
}
