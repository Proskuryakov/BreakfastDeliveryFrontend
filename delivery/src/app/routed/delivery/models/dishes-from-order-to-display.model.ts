import { DishModel } from './dish.model';

export interface DishesFromOrderToDisplayModel
  extends DishModel {
  count: number;
}
