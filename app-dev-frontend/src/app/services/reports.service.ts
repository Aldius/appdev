import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Report} from "../model/Report";
import {Routes, Server} from "../utils/ServerRoutes";

@Injectable()
export class ReportService {

  constructor(private http: Http) {
  }

  getReports(): Observable<Report[]> {
    return this.http.get(Server.routeTo(Routes.REPORT))
      .map(res => {
        return res.json();
      })
  }

  newReport(report: Report) {
    return this.http.post(Server.routeTo(Routes.REPORT), report)
      .map(res => {
        return res.json();
      })
  }
}
