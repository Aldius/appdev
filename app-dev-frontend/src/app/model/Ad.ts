import {User} from "../model/User";

export enum ADTYPE {
  FORSALE = 'FORSALE',
  WOULDBUY = 'WOULDBUY',
  LOST = 'LOST'
}

export enum STATUS {
  APPROVED = 'APPROVED',
  WAITING = 'WAITING',
  DISAPPROVED = 'DISAPPROVED'
}

export class Ad  {
  advertiser: User;
  title: string;
  picture_path: string;
  adType: ADTYPE;
  status: STATUS;
  description: string;

  constructor(advertiser: User, title: string, picture_path: string, adtype: ADTYPE, status: STATUS, description: string) {
    this.advertiser = advertiser;
    this.title = title;
    this.picture_path = picture_path;
    this.adType = adtype;
    this.status = status;
    this.description = description;
  }
}
