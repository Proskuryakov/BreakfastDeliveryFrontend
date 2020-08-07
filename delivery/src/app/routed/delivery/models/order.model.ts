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
  address: {
    city: string;
    street: string;
    house: string;
    flat: string;
    entrance: string;
    floor: string;
  };
  check: number;
}
