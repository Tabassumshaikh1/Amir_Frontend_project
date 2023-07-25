import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.component.html',
  styleUrls: ['./view-my-profile.component.css'],
})
export class ViewMyProfileComponent implements OnInit {
  loggedInUser: IUser;

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser = this.authSvc.getLoggedInUser;
  }
}
