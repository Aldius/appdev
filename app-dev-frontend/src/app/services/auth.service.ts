import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Role, User} from "../model/User";
import {Routes, Server} from "../utils/ServerRoutes";
import enumerate = Reflect.enumerate;

@Injectable()
export class AuthService {
  user: User;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: Http) {
    this.user = new User();
  }

  login(user: User) {
    return this.http.post(Server.routeTo(Routes.LOGIN), user)
      .map(res => {
        this.isLoggedIn = true;
        this.user = res.json();
        this.isAdmin = this.user.role == Role.ADMIN;
        return this.user;
      })
  }

  register(user: User) {
    return this.http.post(Server.routeTo(Routes.REGISTER), user)
      .map(res => {
        this.isLoggedIn = true;
        this.user = res.json();
        return this.user;
      })
  }

  logout() {
    return this.http.get(Server.routeTo(Routes.LOGOUT))
      .map(res => {
        this.user = null;
        this.isLoggedIn = false;
        this.isAdmin = false;
      })
  }

  modify(user: User) {
    return this.http.post(Server.routeTo(Routes.MODIFY_USER), user)
      .map(res => {
        this.user = res.json();
      })
  }
}
