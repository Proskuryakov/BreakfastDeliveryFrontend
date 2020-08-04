import { Component, Inject, OnInit } from '@angular/core';
import { DishFromBasketModel } from '../../../models/dishes-from-basket.model';
import { HttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { RegisterOrderInputModel } from '../../../models/register-order-input.model';
import { RegisterOrderDataModel } from '../../../models/register-order-data.model';

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
    console.log('input', input);
    this.http
      .post<RegisterOrderInputModel>(
        `http://127.0.0.1:8080/api//orders`,
        input
      )
      .subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }
}
