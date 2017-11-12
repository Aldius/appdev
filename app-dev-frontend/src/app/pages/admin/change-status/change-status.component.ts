import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AdsService} from "../../../services/ads.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeStatusComponent {

  statusForm: FormGroup = new FormGroup({
    status: new FormControl(''),
  });

  constructor(private adsService: AdsService, public dialogRef: MatDialogRef<ChangeStatusComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  get status()
  {
    return this.statusForm.get('status');
  }

  submit() {
    this.data.status = this.status.value;
    this.adsService.setStatus(this.data)
      .subscribe(
        res => console.log(res)
      );
    this.dialogRef.close();
  }
}
