import {DishFromBasketModel} from '../../dishes/models/dish.model';

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

export interface RegisterOrderDataModel {
  dishes: DishFromBasketModel[];
}
export interface DialogModelUpdateOrderStatus {
  id: number;
  status: string;
}
export enum StatusesOfOrder {
  ORDER_IN_PROCESSING = 'ORDER_IN_PROCESSING',
  ORDER_PREPARING = 'ORDER_PREPARING',
  ORDER_DELIVERY = 'ORDER_DELIVERY',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  ORDER_CANCELLED = 'ORDER_CANCELLED'
}
