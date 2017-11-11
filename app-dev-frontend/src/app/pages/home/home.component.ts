import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Ad, ADTYPE} from "../../model/Ad";
import {AdsService} from "../../services/ads.service";
import {ReportComponent} from "../report/report.component";
import {MatDialog} from "@angular/material";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  ads: Ad[];

  constructor(private authService: AuthService, private adsService: AdsService, public dialog: MatDialog) {}

  report(ad: Ad): void {
    let reportDialogRef = this.dialog.open(ReportComponent, {
      height: '210px',
      width: '320px',
      data:{
        user: ad.advertiser,
        reported_by: this.authService.user
      }
    });

    reportDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.adsService.getAds().subscribe(res =>{
      this.ads = res;
      console.log(this.ads);
    });
  }

  notBuying(ad: Ad)
  {
    return ad.adType != ADTYPE.WOULDBUY;
  }
}
