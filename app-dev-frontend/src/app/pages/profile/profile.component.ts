import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn)
    {
      location.assign('login');
    }
    this.user = this.authService.user;
  }

  userValid() {
    return(
      this.user.password != ""
      && this.user.email != ""
      && this.user.email.match("[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+")
      );
  }

  submit() {
    console.log(this.user);
  }
}
