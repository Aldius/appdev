import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Message} from "../../model/Message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent{
  constructor(public dialogRef: MatDialogRef<MessageComponent>, @Inject(MAT_DIALOG_DATA) public data: Message) { }
}
