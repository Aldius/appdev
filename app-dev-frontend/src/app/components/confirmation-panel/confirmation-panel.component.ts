import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-confirmation-panel',
  templateUrl: './confirmation-panel.component.html',
  styleUrls: ['./confirmation-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationPanelComponent{
  text: String;

  constructor(public dialogRef: MatDialogRef<ConfirmationPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.text = data;
  }

  submit() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
