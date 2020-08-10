import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DishesPage } from './routed/delivery/pages/dishes/dishes.page';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { OrderPage } from './routed/delivery/pages/order/order.page';
import { RestaurantsPage } from './routed/delivery/pages/restaurants/restaurants.page';
import { MainPage } from './routed/delivery/pages/main/main.page';
import { MatCardModule } from '@angular/material/card';
import { OrderComponent } from './routed/delivery/components/order/order.component';
import { AllDishesComponent } from './routed/delivery/components/all-dishes/all-dishes.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterOrderDialogDialog } from './routed/delivery/components/dialogs/register-order-dialog/register-order-dialog.dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDishToBasketDialogDialog } from './routed/delivery/components/dialogs/add-dish-to-basket-dialog/add-dish-to-basket-dialog.dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrderRegistrationSuccessDialogDialog } from './routed/delivery/components/dialogs/order-registration-success-dialog/order-registration-success-dialog.dialog';
import { DeleteDishFromBasketDialogDialog } from './routed/delivery/components/dialogs/delete-dish-from-basket-dialog/delete-dish-from-basket-dialog.dialog';
import { DishAlreadyInBasketDialogDialog } from './routed/delivery/components/dialogs/dish-already-in-basket-dialog/dish-already-in-basket-dialog.dialog';
import { MatTreeModule } from '@angular/material/tree';
import { OrderAlreadyCreatedDialog } from './routed/delivery/components/dialogs/order-already-created/order-already-created.dialog';
import { OrderStatusPipe } from './features/orders/pipes/order-status.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AllRestaurantsComponent } from './routed/delivery/components/all-restaurants/all-restaurants.component';
import { RestaurantDishesPage } from './routed/delivery/pages/restaurant-dishes/restaurant-dishes.page';
import { DishesInRestaurantComponent } from './routed/delivery/components/dishes-in-restaurant/dishes-in-restaurant.component';
import { AdminPage } from './routed/delivery/pages/admin-page/admin-page.component';
import { FilterOrderPipe } from './features/orders/pipes/filter-order-pipe.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
// tslint:disable-next-line:max-line-length
import { DeleteOrderDialogAdminDialog } from './routed/delivery/components/dialogs/delete-order-dialog-admin/delete-order-dialog-admin.dialog';
import { UpdateStatusAdminDialogDialog } from './routed/delivery/components/dialogs/update-status-admin-dialog/update-status-admin-dialog.dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AdminOrderPageComponent } from './routed/delivery/components/admin-order-page/admin-order-page.component';
import { CreateNewDishDialogDialog } from './routed/delivery/components/dialogs/create-new-dish/create-new-dish-dialog.dialog';

@NgModule({
  declarations: [
    AppComponent,
    DishesPage,
    OrderPage,
    RestaurantsPage,
    MainPage,
    OrderComponent,
    AllDishesComponent,
    RegisterOrderDialogDialog,
    AddDishToBasketDialogDialog,
    OrderRegistrationSuccessDialogDialog,
    DeleteDishFromBasketDialogDialog,
    DishAlreadyInBasketDialogDialog,
    OrderAlreadyCreatedDialog,
    OrderStatusPipe,
    AllRestaurantsComponent,
    RestaurantDishesPage,
    DishesInRestaurantComponent,
    AdminPage,
    AdminOrderPageComponent,
    FilterOrderPipe,
    DeleteOrderDialogAdminDialog,
    UpdateStatusAdminDialogDialog,
    CreateNewDishDialogDialog
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
    MatTreeModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
