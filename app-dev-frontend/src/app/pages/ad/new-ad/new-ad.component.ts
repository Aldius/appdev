import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ad, ADTYPE} from "../../../model/Ad";
import {AdsService} from "../../../services/ads.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewAdComponent implements OnInit {

  newAdForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    picture_path: new FormControl('', [Validators.required]),
    adtype: new FormControl(''),
    description: new FormControl('', [Validators.required])
  });

  constructor(private adService: AdsService, private authService: AuthService) {
  }

  ngOnInit() {
    if(!this.authService.isLoggedIn)
    {
      location.assign('login');
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
    console.log(new Ad(this.authService.user, this.title.value, this.picture_path.value, this.adtype.value, null, this.description.value));
    this.adService.newAd(new Ad(this.authService.user, this.title.value, this.picture_path.value, this.adtype.value, null, this.description.value))
      .subscribe(
        res =>{
          res;
        },
        err => console.log(err)
      )
  }

}
