import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/User";
import {MessagesService} from "../../../services/messages.service";
import {Message} from "../../../model/Message";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewMessageComponent implements OnInit {
  users: User[];

  messageForm: FormGroup = new FormGroup({
    user: new FormControl(''),
    text: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });

  constructor(private userService: AuthService, private messageService: MessagesService, private _flashMessagesService: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn)
    {
      this.router.navigate(['/login']);
    }

    this.messageService.getUsernames().subscribe(res => {
      console.log(res);
      this.users = res;
    });

  }

  get username()
  {
    return this.messageForm.get('user');
  }

  get text()
  {
    return this.messageForm.get('text');
  }

  submit() {
    var message = new Message(new User(this.username.value), this.userService.user, this.text.value);
    this.messageService.newMessage(message).subscribe(res => {
      console.log(res);
      this._flashMessagesService.show('Message sent', { timeout: 2000, cssClass: 'success' });
      this.router.navigate(['/message/sent'])
    });
  }
}
