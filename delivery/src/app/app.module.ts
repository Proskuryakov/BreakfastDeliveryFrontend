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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterOrderDialogDialog } from './routed/delivery/components/dialogs/register-order-dialog/register-order-dialog.dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDishToOrderDialogDialog } from './routed/delivery/components/dialogs/add-dish-to-order-dialog/add-dish-to-order-dialog.dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrderRegistrationSuccessDialogDialog } from './routed/delivery/components/dialogs/order-registration-success-dialog/order-registration-success-dialog.dialog';
import { DeleteDishFromOrderDialogDialog } from './routed/delivery/components/dialogs/delete-dish-from-order-dialog/delete-dish-from-order-dialog.dialog';
import { DishAlreadyInBasketDialogDialog } from './routed/delivery/components/dialogs/dish-already-in-basket-dialog/dish-already-in-basket-dialog.dialog';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [
    AppComponent,
    DishesPage,
    OrderPage,
    RestaurantsPage,
    MainPage,
    DishesInOrderComponent,
    AllDishesComponent,
    RegisterOrderDialogDialog,
    AddDishToOrderDialogDialog,
    OrderRegistrationSuccessDialogDialog,
    DeleteDishFromOrderDialogDialog,
    DishAlreadyInBasketDialogDialog
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
    MatCardModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
