import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";
import {Report} from "../../model/Report";
import {ReportService} from "../../services/reports.service";
import {FlashMessagesService} from "angular2-flash-messages";

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

  constructor(private reportService: ReportService, private _flashMessagesService: FlashMessagesService, public dialogRef: MatDialogRef<ReportComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  get reportReason()
  {
    return this.reportForm.get('report_reason');
  }

  submit() {
    this.reportService.newReport(new Report(this.data.reported_by, this.data.user, this.reportReason.value))
      .subscribe(
        res => this._flashMessagesService.show('Reported successfully', { timeout: 2000, cssClass: 'success' })
      );
    this.dialogRef.close();
  }
}
