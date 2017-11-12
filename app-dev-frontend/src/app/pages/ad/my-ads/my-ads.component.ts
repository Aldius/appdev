import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Ad, ADTYPE} from "../../../model/Ad";
import {AuthService} from "../../../services/auth.service";
import {AdsService} from "../../../services/ads.service";
import {EditAdComponent} from "../edit-ad/edit-ad.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyAdsComponent implements OnInit {

  ads: Ad[];

  constructor(private authService: AuthService, private adsService: AdsService, public dialog: MatDialog) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn)
    {
      location.assign('login');
    }

    this.adsService.getAdsByUser(this.authService.user).subscribe(res =>{
      this.ads = res;
      console.log(this.ads);
    });
  }

  delete(ad: Ad)
  {
    this.adsService.deleteAd(ad).subscribe( res =>{
      var index = this.ads.indexOf(ad);
      if (index > -1)
      {
        this.ads.splice(index, 1);
      }
      console.log(res);
    })
  }

  modifyAd(ad: Ad): void {
    let modifyDialogRef = this.dialog.open(EditAdComponent, {
      data: ad
    });

    modifyDialogRef.afterClosed().subscribe(data => {
      if(!data) {
        console.log("No change detected")
      }
    });
  }

  notBuying(ad: Ad)
  {
    return ad.adType != ADTYPE.WOULDBUY;
  }

  adtext(ad: Ad) {
    switch(ad.adType){
      case ADTYPE.FORSALE: return "Selling";
      case ADTYPE.WOULDBUY: return "Buying";
      case ADTYPE.LOST: return "Lost";
    }
  }
}
