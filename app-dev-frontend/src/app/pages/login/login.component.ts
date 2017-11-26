import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login_failed: boolean;

  constructor(private loginService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.loginService.login(new User(this.username.value, this.password.value))
      .subscribe(
        res =>{
          this.login_failed = false;
          this.router.navigate(['/profile']);
        },
        err => this.login_failed = true)
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
