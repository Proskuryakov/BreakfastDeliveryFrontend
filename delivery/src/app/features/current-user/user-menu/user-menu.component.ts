import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../core/auth/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.sass']
})
export class UserMenuComponent implements OnInit {
  role = localStorage.getItem('role');
  username = localStorage.getItem('username');

  constructor(private readonly currentUserService: CurrentUserService, private readonly router: Router) {}

  ngOnInit(): void {
    if (localStorage.length === 0) {
      this.router.navigate(['/auth/login']);
    }
  }

  handleLogoutClick(): void {
    this.currentUserService.logout().subscribe(() => {});
    localStorage.clear();
    window.location.reload();
  }
}
