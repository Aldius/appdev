export enum Role {
  GUEST, USER, ADMIN
}

export class User {
  username: String;
  password: String;
  email: String;
  display_name: String;
  role: Role;

  constructor(username?: String, password?: String, email?: String, role?: Role, display_name?: String) {
    this.username = username || "";
    this.password = password || "";
    this.email = email || "";
    this.role = role || Role.GUEST;
    this.display_name = display_name || "";
  }
}
