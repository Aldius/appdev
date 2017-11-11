import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Routes, Server} from "../utils/ServerRoutes";
import {Ad} from "../model/Ad";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AdsService {

  constructor(private http: Http) {
  }

  getAds(): Observable<Ad[]> {
    return this.http.get(Server.routeTo(Routes.GET_ADS))
      .map(res => {
        return res.json();
      })
  }

  newAd(ad: Ad) {
    console.log(ad);
    return this.http.post(Server.routeTo(Routes.NEW_AD), ad)
      .map(res => {
        return res.json();
      })
  }
}
