import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Ad, ADTYPE} from "../../../model/Ad";

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrls: ['./view-ad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAdComponent{
  constructor(public dialogRef: MatDialogRef<ViewAdComponent>, @Inject(MAT_DIALOG_DATA) public data: Ad) { }

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
