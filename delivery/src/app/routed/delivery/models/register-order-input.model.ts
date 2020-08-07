import { DishFromBasketModel } from './dishes-from-basket.model';

export interface RegisterOrderInputModel {
  userId: number;
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
