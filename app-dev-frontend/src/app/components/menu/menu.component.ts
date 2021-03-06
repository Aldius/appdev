import {Component, OnInit} from '@angular/core';
import {Role} from "../../model/User";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router/";
import {Router} from "@angular/router";

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

  private ads: MenuItem[] = [
    {link: '/ad/new', title: 'New advertisement'},
    {link: '/ad/own', title: 'My advertisements'},
  ];

  private messages: MenuItem[] = [
    {link: '/message', title: 'New message'},
    {link: '/message/sent', title: 'Sent messages'},
    {link: '/message/got', title: 'Got messages'}
  ];

  private admin: MenuItem[] = [
    {link: '/admin/ads', title: 'Manage advertisements'},
    {link: 'admin/reports', title: 'Manage reports'},
    {link: 'admin/users', title: 'Manage users'}
  ]

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
        this.router.navigate(['/home']);
      })
  }
}
