import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/User";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private _flashMessagesService: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn)
    {
      this.router.navigate(['/login']);
    }
    this.user = this.authService.user;
  }

  userValid() {
    return(
      this.user.password != ""
      && this.user.email != ""
      && this.user.email.match("[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+")
      && this.user.phone.match("[+]?[0-9]*")
      );
  }

  submit() {
    this.authService.modify(this.user).subscribe(
      res => {
        console.log(res);
        this._flashMessagesService.show('Saved successfully', { timeout: 2000, cssClass: 'success' });
        this.user = this.authService.user;
      }
    );
  }

  delete() {
    this.authService.delete(this.user).subscribe(
      res =>{
        console.log(res);
        this._flashMessagesService.show('Deleted successfully', { timeout: 2000, cssClass: 'success' });
        this.router.navigate(['/home']);
      }
    );
  }
}
