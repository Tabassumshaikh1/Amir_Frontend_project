import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  get loggedInUser(): IUser {
    return this.authSvc.getLoggedInUser;
  }
  constructor(private authSvc: AuthService, private router: Router, private sidebarSvc: SidebarService) {}

  ngOnInit(): void {}

  openSidebar(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.sidebarSvc.toggleSidebar();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
