export class Routes {
  static LOGIN: String = 'user/login';
  static REGISTER: String = 'user/register';
  static LOGOUT: String = 'user/logout';
  static MODIFY_USER: String = 'user/modify';
  static DELETE_USER: String = 'user/delete';
  static GET_ADS: String = 'ad';
  static USER_ADS: String = 'ad/user';
  static NEW_AD: String = 'ad/add';
  static DELETE_AD: String = 'ad/delete';
  static MODIFY_AD: String = 'ad/modify';
  static ADMIN_ADS: String = 'ad/all';
  static AD_STATUS: String = 'ad/setstatus';
  static ADMIN_USERS: String = 'user/all';
  static REPORT: String = 'reports';
}

export class Server {
  private static address: String = 'localhost';
  private static port: String = '4200';
  private static prefix: String = 'api';

  static routeTo(route: String) {
    return `http://${Server.address}:${Server.port}/${Server.prefix}/${route}`
  }
}
