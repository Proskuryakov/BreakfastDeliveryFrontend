import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishList } from '../../models/dishes.model';

@Component({
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.sass']
})
export class DishesPage implements OnInit {
  items: DishList[] = [];

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
