import { DishModel } from './dishes.model';

export interface DishesFromBasketToDisplayModel
  extends DishModel {
  count: number;
}
