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
    return this.http.get(Server.routeTo(Routes.HOME))
      .map(res => {
        return res.json();
      })
  }

  newAd(ad: Ad) {
    return this.http.post(Server.routeTo(Routes.NEW_ADD), ad)
      .map(res => {
        return res.json();
      })
  }
}
