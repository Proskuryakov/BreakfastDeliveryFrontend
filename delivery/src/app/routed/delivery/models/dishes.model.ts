export interface DishList {
  dishCalories: number;
  dishCookingTimeMinutes: number;
  dishType: string;
  id: number;
  dishImage: string;
  restaurantId: number;
  mainDishInfo: {
    dishName: string;
    dishPrice: number;
  };
}
