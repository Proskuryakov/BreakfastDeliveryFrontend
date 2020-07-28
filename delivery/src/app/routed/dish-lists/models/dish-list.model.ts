export interface DishList {
  dishCalories: number;
  dishCookingTimeMinutes: number;
  dishType: string;
  id: number;
  mainDishInfo: {
    dishName: string;
    dishPrice: number;
  };
}
