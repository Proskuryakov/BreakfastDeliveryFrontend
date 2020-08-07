import { Component, Inject, OnInit } from '@angular/core';
import { DishFromBasketModel } from '../../../models/dishes-from-basket.model';
import { HttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { RegisterOrderInputModel } from '../../../models/register-order-input.model';
import { RegisterOrderDataModel } from '../../../models/register-order-data.model';
import { OrderRegistrationSuccessDialogDialog } from '../order-registration-success-dialog/order-registration-success-dialog.dialog';

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
  styleUrls: ['./register-order-dialog.dialog.sass']
})
export class RegisterOrderDialogDialog implements OnInit {
  phone = '';
  city = '';
  street = '';
  house = '';
  flat = '';
  entrance = '';
  floor = '';

  loading = false;

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: RegisterOrderDataModel,
    private readonly dialogRef: MatDialogRef<
      RegisterOrderDialogDialog,
      boolean
    >
  ) {}

  ngOnInit(): void {}

  handleRegisterOrderClick(
    value: RegisterOrderFormValue
  ): void {
    this.loading = true;
    const input: RegisterOrderInputModel = {
      phone: value.phone,
      address: {
        city: value.city,
        street: value.street,
        house: value.house,
        flat: value.flat,
        entrance: value.entrance,
        floor: value.floor
      },
      listOfDishes: this.data.dishes
    };
    this.http
      .post<RegisterOrderInputModel>(
        `http://127.0.0.1:8080/api//orders`,
        input
      )
      .subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close(true);
          this.dialog.open(
            OrderRegistrationSuccessDialogDialog
          );
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }
}
