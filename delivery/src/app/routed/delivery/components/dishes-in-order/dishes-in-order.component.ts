import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../../models/dishes.model';

@Component({
  selector: 'app-dishes-in-order',
  templateUrl: './dishes-in-order.component.html',
  styleUrls: ['./dishes-in-order.component.sass']
})
export class DishesInOrderComponent implements OnInit {
  @Input()
  orderDishesList: Dish[] = [];

  constructor() {}

  ngOnInit(): void {}
}
