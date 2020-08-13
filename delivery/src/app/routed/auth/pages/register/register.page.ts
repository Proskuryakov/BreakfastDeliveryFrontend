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
  lastName = '';
  phone = '';
  email = '';

  constructor(private _formBuilder: FormBuilder, private readonly usersApiService: UsersApiService) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      usernameCtrl: ['', [Validators.required]],
      passwordCtrl: ['', [Validators.required]]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstNameCtrl: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$')]
      ],
      lastNameCtrl: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$')]
      ],
      phoneCtrl: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('^[0-9]+$')]
      ],
      emailCtrl: [
        '',
        [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ]
    });
  }

  handleRegisterUser(): void {
    const input: RegisterUserInputModel = {
      username: this.username,
      password: this.password,
      userRole: 'CLIENT',
      personalInfo: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone
      }
    };
    this.usersApiService.createUser(input).subscribe();
  }

  /* tslint:disable */
  onKeyUsername(event: any): void {
    this.username = event.target.value;
  }

  onKeyPassword(event: any): void {
    this.password = event.target.value;
  }

  onKeyFirstName(event: any): void {
    this.firstName = event.target.value;
  }

  onKeyLastName(event: any): void {
    this.lastName = event.target.value;
  }

  onKeyEmail(event: any): void {
    this.email = event.target.value;
  }

  onKeyPhone(event: any): void {
    this.phone = event.target.value;
  }
}
