export enum Role {
  GUEST = 'GUEST', USER = 'USER', ADMIN = 'ADMIN'
}

export class User {
  username: String;
  password: String;
  email: String;
  phone: String;
  fullName: String;
  role: Role;

  constructor(username?: String, password?: String, email?: String, role?: Role, fullName?: String, phone?: String) {
    this.username = username || "";
    this.password = password || "";
    this.email = email || "";
    this.role = role || Role.GUEST;
    this.fullName = fullName || "";
    this.phone = phone || "";
  }
}
