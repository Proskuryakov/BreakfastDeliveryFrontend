import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloPage } from './sandbox/pages/hello/hello.page';
import { NumbersPage } from './sandbox/pages/numbers/numbers.page';
import { DishListsPage } from './routed/dish-lists/pages/dish-lists/dish-lists.page';

const routes: Routes = [
  {
    path: '',
    component: DishListsPage
  },
  {
    path: 'hello',
    component: HelloPage
  },
  {
    path: 'numbers',
    component: NumbersPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
