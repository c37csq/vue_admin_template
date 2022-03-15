// 登陆信息
import { PageParams } from '@/API/common/model/requestModel';

export type RoleFormType = {
  roleCode: string;
  roleName: string;
  useStatus: '0' | '1';
};

// request role list
export type RequestRoleListParams = RoleFormType & PageParams;

// response role list
export type RoleListItem = {
  roleId: number;
  roleCode: string;
  createTime: string;
  roleName: string;
  roleRemark: string;
  showPower: number;
  updateTime: string;
  useStatus: '0' | '1';
};

export type OperateRoleRequestParams = {
  roleName: string;
  roleRemark: string;
  roleCode: string;
  useStatus?: '0' | '1';
};
