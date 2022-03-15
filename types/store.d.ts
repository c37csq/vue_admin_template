// 用户信息
export interface UserInfo {
  account: string;
  businessGroupCode: string;
  mailbox: string;
  phone: string;
  roleCode: string;
  showPower: 0 | 1; // 0 全部权限 1 自己权限
  telephone: null;
  token: string;
  useStatus: '0' | '1';
  userId: number;
  userName: string;
}