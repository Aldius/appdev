export enum Role {
  GUEST, USER, ADMIN
}

export class User {
  username: String;
  password: String;
  email: String;
  phone_number: String;
  full_name: String;
  role: Role;

  constructor(username?: String, password?: String, email?: String, role?: Role, full_name?: String, phone_number?: String) {
    this.username = username || "";
    this.password = password || "";
    this.email = email || "";
    this.role = role || Role.GUEST;
    this.full_name = full_name || "";
    this.phone_number = phone_number || "";
  }
}
