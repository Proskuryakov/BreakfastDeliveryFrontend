import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterOrderInputModel } from '../../../../features/orders/models/order.model';
import { RegisterUserInputModel } from '../../../../features/current-user/models/user.model';
import { OrdersApiService } from '../../../../features/orders/services/orders-api.service';
import { UsersApiService } from '../../../../features/current-user/services/users-api.service';

interface RegisterUserFormValue {
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phone: string;
  email: string;
}

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.sass']
})
export class RegisterPage implements OnInit {
  firstFormGroup: FormGroup | undefined;
  secondFormGroup: FormGroup | undefined;

  username = '';
  password = '';
  firstName = '';
  lastname = '';
  phone = '';
  email = '';

  constructor(private _formBuilder: FormBuilder, private readonly usersApiService: UsersApiService) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:no-any
  onKeyUsername(event: any): void {
    this.username = event.target.value;
  }

  // tslint:disable-next-line:no-any
  onKeyPassword(event: any): void {
    this.password = event.target.value;
  }

  // tslint:disable-next-line:no-any
  onKeyFirstName(event: any): void {
    this.firstName = event.target.value;
  }

  // tslint:disable-next-line:no-any
  onKeyLastname(event: any): void {
    this.lastname = event.target.value;
  }

  // tslint:disable-next-line:no-any
  onKeyEmail(event: any): void {
    this.email = event.target.value;
  }

  // tslint:disable-next-line:no-any
  onKeyPhone(event: any): void {
    this.phone = event.target.value;
  }

  handleRegisterUser(): void {
    const input: RegisterUserInputModel = {
      username: this.username,
      password: this.password,
      userRole: 'CLIENT',
      personalInfo: {
        firstName: this.firstName,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone
      }
    };
    this.usersApiService.createUser(input).subscribe();
  }
}
