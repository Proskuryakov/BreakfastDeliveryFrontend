import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './sandbox/components/hello/hello.component';
import { HelloPage } from './sandbox/pages/hello/hello.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NumbersPage } from './sandbox/pages/numbers/numbers.page';
import { CounterComponent } from './sandbox/components/counter/counter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DishListsPage } from './routed/dish-lists/pages/dish-lists/dish-lists.page';
import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    HelloPage,
    NumbersPage,
    CounterComponent,
    DishListsPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
