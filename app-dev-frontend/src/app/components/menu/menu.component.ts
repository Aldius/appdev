import {Component, OnInit} from '@angular/core';
import {Role} from "../../model/User";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router/";

interface MenuItem {
  link: String;
  title: String;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private common: MenuItem[] = [
    {link: '/home', title: 'Home'}
  ];

  private user: MenuItem[] = [
    {link: '/ad/new', title: 'New advertisement'}
  ];

  private admin: MenuItem[] = [
    {link: '/admin', title: 'Admin'}
  ]

  private roleMenus = new Map<Role, MenuItem[]>([
    [Role.GUEST, [...this.common]],
    [Role.USER, [...this.common, ...this.user]],
    [Role.ADMIN, [...this.common, ...this.user, ...this.admin]],
  ]);

  menus: MenuItem[];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    //if (this.authService.isLoggedIn) {
    //  this.menus = this.roleMenus.get(this.authService.user.role);
    //} else {
    //  this.menus = this.roleMenus.get(Role.GUEST)
    //}
    this.menus = this.roleMenus.get(Role.ADMIN);
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
        console.log(res);
      })
  }
}
