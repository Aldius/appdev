import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Ad, ADTYPE} from "../../../model/Ad";
import {AdsService} from "../../../services/ads.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditAdComponent{


  constructor(private adService: AdsService,public dialogRef: MatDialogRef<EditAdComponent>, @Inject(MAT_DIALOG_DATA) public data: Ad, private _flashMessagesService: FlashMessagesService) {  }

  notBuying()
  {
    return this.data.adType != ADTYPE.WOULDBUY;
  }

  submit()
  {
    this.adService.modifyAd(this.data).subscribe(
      res => this._flashMessagesService.show('Saved successfully', { timeout: 2000, cssClass: 'success' })
    )
    this.dialogRef.close();
  }

  close()
  {
    this._flashMessagesService.show('Changes discarded', { timeout: 2000, cssClass: 'flash-error' })
    this.dialogRef.close();
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
