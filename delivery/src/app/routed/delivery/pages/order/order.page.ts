import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dishes.model';

@Component({
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.sass']
})
export class OrderPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleDishesListChange(dishesList: Dish[]): void {}
}
