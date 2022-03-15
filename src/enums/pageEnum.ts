export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/home',
  BASE_REDIRECT_HOME = '/home/homePage',
}

export enum DeptEnum {
  SELL_DEPT = 'B003', // 销售部
  SERVICE_DEPT = 'B005', // 客服部
  MARKET_DEPT = 'B009', // 市场部
}

export enum RoleEnum {
  SUPER_ADMIN = 'R001',
  OVERSEAS_SERVICE = 'R002',
  SELL = 'R003',
  OVERSEAS_SERVICE_MANAGE = 'R004',
  SELL_MANAGE = 'R005',
  FINANCE_MANAGE = 'R006',
  MARKET_MANAGE = 'R020',
}

export enum SelectEnum {
  LABEL = '全部',
  KEY = 'all',
  VALUE = 'all',
}

export enum ApiEnum {
  BOOKING_AGENT = 'M',
  SHIP_COMPANY = 'B',
}
