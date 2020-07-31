import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './routed/delivery/pages/main/main.page';
import { OrderPage } from './routed/delivery/pages/order/order.page';
import { RestaurantsPage } from './routed/delivery/pages/restaurants/restaurants.page';
import { DishesPage } from './routed/delivery/pages/dishes/dishes.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'dishes',
    component: DishesPage
  },
  {
    path: 'restaurants',
    component: RestaurantsPage
  },
  {
    path: 'order',
    component: OrderPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
