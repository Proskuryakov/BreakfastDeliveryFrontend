import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DishesPage } from './routed/delivery/pages/dishes/dishes.page';
import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { OrderPage } from './routed/delivery/pages/order/order.page';
import { RestaurantsPage } from './routed/delivery/pages/restaurants/restaurants.page';
import { MainPage } from './routed/delivery/pages/main/main.page';
import { MatCardModule } from '@angular/material/card';
import { DishesInOrderComponent } from './routed/delivery/components/dishes-in-order/dishes-in-order.component';
import { AllDishesComponent } from './routed/delivery/components/all-dishes/all-dishes.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesPage,
    OrderPage,
    RestaurantsPage,
    MainPage,
    DishesInOrderComponent,
    AllDishesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
