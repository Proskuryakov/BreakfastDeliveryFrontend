import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishList } from '../../models/dish-list.model';

@Component({
  templateUrl: './dish-lists.page.html',
  styleUrls: ['./dish-lists.page.sass']
})
export class DishListsPage implements OnInit {
  items: DishList[] = [];
  total = 0;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.refreshLists();
  }

  private refreshLists(): void {
    this.http
      .get<DishList[]>('http://127.0.0.1:8080/api/dishes')
      .subscribe((result) => {
        this.items = result;
      });
  }
}
