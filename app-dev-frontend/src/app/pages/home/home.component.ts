import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Ad} from "../../model/Ad";
import {AdsService} from "../../services/ads.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  ads: Ad[];

  constructor(private adsService: AdsService) { }

  ngOnInit() {
    this.adsService.getAds().subscribe(res =>{
      this.ads = res;
      console.log(this.ads);
    });
  }
}
