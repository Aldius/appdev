import {Component, OnInit} from '@angular/core';
import {Role} from "../../model/User";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router/";
import {HomeComponent} from "../../pages/home/home.component";
import {appRoutes} from "../../routes";
import {rootRoute} from "@angular/router/src/router_module";

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

  private roleMenus = new Map<Role, MenuItem[]>([
    [Role.GUEST, [...this.common]],
    [Role.USER, [...this.common]],
    [Role.ADMIN, [...this.common, {link: '/admin', title: 'Admin'}]],
  ]);

  menus: MenuItem[];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.menus = this.roleMenus.get(this.authService.user.role);
    } else {
      this.menus = this.roleMenus.get(Role.GUEST)
    }
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
        console.log(res);
      })
  }
}
