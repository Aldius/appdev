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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
        console.log(res);
      })
  }
}
