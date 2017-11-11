export class Routes {
  static LOGIN: String = 'user/login';
  static REGISTER: String = 'user/register';
  static LOGOUT: String = 'user/logout';
  static MODIFY_USER: String = 'user/modify';
  static DELETE_USER: String = 'user/delete';
  static GET_ADS: String = 'ad';
  static NEW_AD: String = 'ad/add';
  static REPORT: String = 'reports'
}

export class Server {
  private static address: String = 'localhost';
  private static port: String = '4200';
  private static prefix: String = 'api';

  static routeTo(route: String) {
    return `http://${Server.address}:${Server.port}/${Server.prefix}/${route}`
  }
}
