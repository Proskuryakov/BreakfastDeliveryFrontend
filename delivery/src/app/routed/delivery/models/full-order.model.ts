export interface OrderModel {
  id: number;
  userId: number;
  createdAt: string;
  status: string;
  phone: string;
  listOfDishes: [
    {
      count: number;
      dishId: number;
    }
  ];
  check: number;
}
