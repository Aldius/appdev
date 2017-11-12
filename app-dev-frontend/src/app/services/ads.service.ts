import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Routes, Server} from "../utils/ServerRoutes";
import {Ad} from "../model/Ad";
import {Observable} from "rxjs/Observable";
import {User} from "../model/User";

@Injectable()
export class AdsService {

  constructor(private http: Http) {
  }

  getAdsByUser(user: User): Observable<Ad[]> {
    return this.http.post(Server.routeTo(Routes.USER_ADS), user)
      .map(res => {
        return res.json();
      })
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

  deleteAd(ad: Ad)
  {
    console.log(ad);
    return this.http.post(Server.routeTo(Routes.DELETE_AD), ad)
      .map(res => {
        return res;
      })
  }

  modifyAd(ad: Ad)
  {
    console.log(ad);
    return this.http.post(Server.routeTo(Routes.MODIFY_AD), ad)
      .map(res => {
        return res.json();
      })
  }
}
