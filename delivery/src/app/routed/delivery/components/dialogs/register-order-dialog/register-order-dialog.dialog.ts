import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderRegistrationSuccessDialogDialog } from '../order-registration-success-dialog/order-registration-success-dialog.dialog';
import { DataService } from '../../../../../data.service';
import { RegisterOrderDataModel, RegisterOrderInputModel } from '../../../../../features/orders/models/order.model';
import { OrdersApiService } from '../../../../../features/orders/services/orders-api.service';
import { CookieService } from 'ngx-cookie-service';

interface RegisterOrderFormValue {
  phone: string;
  city: string;
  street: string;
  house: string;
  flat: string;
  entrance: string;
  floor: string;
}

@Component({
  templateUrl: './register-order-dialog.dialog.html',
  styleUrls: ['./register-order-dialog.dialog.sass'],
  providers: [DataService]
})
export class RegisterOrderDialogDialog implements OnInit {
  phone = '';
  street = '';
  house = '';
  flat = '';
  entrance = '';
  floor = '';

  city = '';

  loading = false;

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly dataService: DataService,
    private readonly ordersApiService: OrdersApiService,
    private cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA)
    public data: RegisterOrderDataModel,
    private readonly dialogRef: MatDialogRef<RegisterOrderDialogDialog, boolean>
  ) {}

  ngOnInit(): void {}

  handleRegisterOrderClick(value: RegisterOrderFormValue): void {
    this.loading = true;
    const input: RegisterOrderInputModel = {
      userId: this.dataService.getUserId(),
      phone: value.phone,
      address: {
        city: this.cookieService.get('city'),
        street: value.street,
        house: value.house,
        flat: value.flat,
        entrance: value.entrance,
        floor: value.floor
      },
      listOfDishes: this.data.dishes
    };
    this.ordersApiService.createOrder(input).subscribe(
      () => {
        this.loading = false;
        this.dialogRef.close(true);
        this.dialog.open(OrderRegistrationSuccessDialogDialog);
      },
      (error) => {
        this.loading = false;
        console.error(error);
      }
    );
  }
}
