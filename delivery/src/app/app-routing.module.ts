import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './routed/delivery/pages/main/main.page';
import { OrderPage } from './routed/delivery/pages/order/order.page';
import { RestaurantsPage } from './routed/delivery/pages/restaurants/restaurants.page';
import { DishesPage } from './routed/delivery/pages/dishes/dishes.page';
import { RestaurantDishesPage } from './routed/delivery/pages/restaurant-dishes/restaurant-dishes.page';
import { AccountPage } from './routed/delivery/pages/account/account.page';
import { AdminPage } from './routed/delivery/pages/admin-page/admin-page.component';

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
  },
  {
    path: 'restaurants/:id/dishes',
    component: RestaurantDishesPage
  },
  {
    path: 'admin',
    component: AdminPage
  },
  {
    path: 'account',
    component: AccountPage
  },
  {
    path: 'auth',
    loadChildren: () => import('./routed/auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
