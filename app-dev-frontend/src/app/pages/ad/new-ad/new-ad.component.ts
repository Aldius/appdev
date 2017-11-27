import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ad, ADTYPE, STATUS} from "../../../model/Ad";
import {AdsService} from "../../../services/ads.service";
import {AuthService} from "../../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewAdComponent implements OnInit {

  newAdForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    picture_path: new FormControl(''),
    adtype: new FormControl(''),
    description: new FormControl('', [Validators.required])
  });

  constructor(private adService: AdsService, private authService: AuthService,
              private _flashMessagesService: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn)
    {
      this.router.navigate(['/login']);
    }
  }

  get title() {
    return this.newAdForm.get('title')
  }

  get picture_path() {
    return this.newAdForm.get('picture_path')
  }

  get adtype() {
    return this.newAdForm.get('adtype')
  }

  get description() {
    return this.newAdForm.get('description')
  }

  submit() {
    this.adService.newAd(new Ad(this.authService.user, this.title.value, this.picture_path.value, this.adtype.value, null, this.description.value))
      .subscribe(
        res =>{
          this.router.navigate(['/ad/own']);
          this._flashMessagesService.show('Added successfully', { timeout: 2000, cssClass: 'success' })
        })
  }

}
