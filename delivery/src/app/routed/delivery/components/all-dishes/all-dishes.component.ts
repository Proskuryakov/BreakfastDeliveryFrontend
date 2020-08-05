import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Dish } from '../../models/dishes.model';
import { HttpClient } from '@angular/common/http';
import { NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-all-dishes',
  templateUrl: './all-dishes.component.html',
  styleUrls: ['./all-dishes.component.sass']
})
export class AllDishesComponent implements OnInit {
  // tslint:disable-next-line:no-any
  searchText: any;

  allDishesList: Dish[] = [];

  orderDishesList: Dish[] = [];

  @Output()
  orderDishesListChange = new EventEmitter<Dish[]>();

  dishToAddToOrder = {} as Dish;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.refreshLists();
  }

  private refreshLists(): void {
    this.http.get<Dish[]>('http://127.0.0.1:8080/api/dishes').subscribe((result) => {
      this.allDishesList = result;
    });
  }

  private getDishById(id: number): void {
    this.http.get<Dish>('http://127.0.0.1:8080/api/dishes/' + id).subscribe((result) => {
      this.dishToAddToOrder = result;
    });
  }

  addDishToOrder(id: number): void {
    this.getDishById(id);
    this.orderDishesList.push(this.dishToAddToOrder);
    this.orderDishesListChange.emit(this.orderDishesList);
  }
}
