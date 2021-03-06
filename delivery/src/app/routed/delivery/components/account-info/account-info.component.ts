import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.sass']
})
export class AccountInfoComponent implements OnInit {
  username: string | null = '';
  role: string | null = '';
  firstName: string | null = '';
  lastName: string | null = '';
  email: string | null = '';
  phone: string | null = '';

  constructor() {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.phone = localStorage.getItem('phone');
  }
}
