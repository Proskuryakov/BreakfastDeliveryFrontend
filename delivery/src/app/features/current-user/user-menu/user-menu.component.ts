import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../core/auth/current-user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.sass']
})
export class UserMenuComponent implements OnInit {
  readonly user$ = this.currentUserService.user$;

  constructor(private readonly currentUserService: CurrentUserService) {}

  ngOnInit(): void {}

  handleLogoutClick(): void {
    this.currentUserService.logout().subscribe(
      () => {},
      (error) => console.error(error)
    );
  }
}
