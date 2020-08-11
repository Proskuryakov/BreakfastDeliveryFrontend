import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../core/auth/current-user.service';
import { Router } from '@angular/router';

interface LoginFormData {
  username: string;
  password: string;
}

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPage implements OnInit {
  error = false;

  constructor(private readonly currentUserService: CurrentUserService, private readonly router: Router) {}

  ngOnInit(): void {}

  handleFormSubmit(value: LoginFormData): void {
    this.error = false;
    this.currentUserService.login(value.username, value.password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error', error);
        this.error = true;
      }
    );
  }
}
