import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Role, User} from "../model/User";
import {Routes, Server} from "../utils/ServerRoutes";
import enumerate = Reflect.enumerate;
import {httpFactory} from "@angular/http/src/http_module";

@Injectable()
export class AuthService {
  user: User;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: Http) {
    this.refresh();
  }

  refresh()
  {
    this.getUser().subscribe(res => {
      this.isLoggedIn = true;
      this.user = res;
      this.isAdmin = this.user.role == Role.ADMIN;
    });
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
        return res;
      })
  }

  modify(user: User) {
    return this.http.post(Server.routeTo(Routes.MODIFY_USER), user)
      .map(res => {
        this.refresh();
      })
  }

  delete(user: User)
  {
    return this.http.post(Server.routeTo(Routes.DELETE_USER), user)
      .map(res => {
        if (this.user.username == user.username)
        {
          this.user = null;
          this.isLoggedIn = false;
          this.isAdmin = false;
        }
      })
  }

  getUsers()
  {
    return this.http.get(Server.routeTo(Routes.ADMIN_USERS)).map(response => {
      return response.json();
    });
  }

  getUser()
  {
    return this.http.get(Server.routeTo(Routes.CURRENT_USER)).map(response => {
      return response.json();
    })
  }
}
