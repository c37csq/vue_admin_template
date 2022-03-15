// 登陆信息
export interface LoginParams {
  account: string;
  password: string;
  companyCode: string;
}

// 菜单
export interface MenuItem {
  component: string;
  gourl: string;
  key: string;
  menuId: number;
  menuKey: number;
  menuName: string;
  path: string;
  src: string;
  title: string;
  type: number;
  parentId: number;
  children: MenuItem[];
}

export interface PowerGroup {
  path: string;
  component: string;
  children: MenuItem[];
}

// 角色权限信息
export interface PowerInfo {
  menuGroup: MenuItem[];
  powerGroup: PowerGroup;
}
