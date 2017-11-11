import {User} from "../model/User";

export enum ADTYPE {
  FORSALE,
  WOULDBUY,
  LOST
}

export enum STATUS {
  APPROVED,
  WAITING,
  DISAPPROVED
}

export class Ad  {
  advertiser: User;
  title: string;
  picture_path: string;
  adType: ADTYPE;
  status: STATUS;
  description: string;

  get adtext() : string
  {
    switch(this.adType){
      case ADTYPE.FORSALE: return "Selling";
      case ADTYPE.LOST: return "Lost";
      case ADTYPE.WOULDBUY: return "Buying";
    }
  }

  constructor(advertiser: User, title: string, picture_path: string, adtype: ADTYPE, status: STATUS, description: string) {
    this.advertiser = advertiser;
    this.title = title;
    this.picture_path = picture_path;
    this.adType = adtype;
    this.status = status;
    this.description = description;
  }
}
