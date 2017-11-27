import {User} from "./User";

export class Message {
  user: User;
  from: User;
  message: String;

  constructor(user: User, from: User, message: String) {
    this.user = user;
    this.from = from;
    this.message = message
  }
}
