import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Ad, ADTYPE} from "../../../model/Ad";
import {AdsService} from "../../../services/ads.service";

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditAdComponent{


  constructor(private adService: AdsService,public dialogRef: MatDialogRef<EditAdComponent>, @Inject(MAT_DIALOG_DATA) public data: Ad) {  }

  notBuying()
  {
    return this.data.adType != ADTYPE.WOULDBUY;
  }

  submit()
  {
    this.adService.modifyAd(this.data).subscribe(
      res => console.log(res)
    )
    this.dialogRef.close(true);
  }

  adValid()
  {
    return (
      (this.notBuying() ? this.data.picture_path != "" : true)
      && this.data.description != ""
      && this.data.title != ""
    )
  }

}
