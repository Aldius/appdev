import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  incorrect_username: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.authService.register(new User(this.username.value, this.password.value, this.email.value))
      .subscribe(
        res => {
          this.incorrect_username = false;
          this.router.navigate(['/profile']);
        },
            err => this.incorrect_username = true)
  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }
}
