import {User} from "../model/User";

export enum ReportReason {
  REASON1='REASON1', REASON2='REASON2', REASON3='REASON3'
}

export class Report  {
  reported_by: User;
  user: User;
  reason: ReportReason;


  constructor(reported_by: User, user: User, reason: ReportReason) {
    this.reported_by = reported_by;
    this.user = user;
    this.reason = reason;
  }
}
