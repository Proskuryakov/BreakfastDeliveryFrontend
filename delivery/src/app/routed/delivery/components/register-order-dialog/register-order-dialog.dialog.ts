import { Component, OnInit } from '@angular/core';

interface FormValue {
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

  constructor() {}

  ngOnInit(): void {}

  handleRegisterOrderClick(value: FormValue): void {
    // tslint:disable-next-line:no-console
    console.info(value);
  }
}
