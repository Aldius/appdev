import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/User";
import {Report} from "../../model/Report";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent{

  reportForm: FormGroup = new FormGroup({
    report_reason: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<ReportComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  get reportReason()
  {
    return this.reportForm.get('report_reason');
  }

  submit() {
    console.log(new Report(this.data.reported_by, this.data.user, this.reportReason.value));
    this.dialogRef.close();
  }
}
