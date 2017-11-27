import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Message} from "../model/Message";
import {Routes, Server} from "../utils/ServerRoutes";

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  sentMessage(): Observable<Message[]> {
    return this.http.get(Server.routeTo(Routes.SENT_MESSAGE))
      .map(res => {
        return res.json();
      })
  }

  gotMessage(): Observable<Message[]> {
    return this.http.get(Server.routeTo(Routes.GOT_MESSAGE))
      .map(res => {
        return res.json();
      })
  }

  newMessage(message: Message): Observable<Message[]> {
    return this.http.post(Server.routeTo(Routes.NEW_MESSAGE), message)
      .map(res => {
        return res.json();
      })
  }

  getUsernames()
  {
    return this.http.get(Server.routeTo(Routes.USERNAMES)).map(response => {
      return response.json();
    });
  }
}
