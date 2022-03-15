import { PageParams } from '@/API/common/model/requestModel';

export type UserFormType = {
  account: string;
  userName: string;
  useStatus: '0' | '1';
  businessGroupCode: string;
  roleCode: string;
};

export type RequestUserListParams = UserFormType & PageParams;

export type UserListItem = {
  account: string;
  businessGroupCode: string;
  businessGroupName: string;
  companyCode: string;
  createTime: string;
  mailbox: string;
  phone: string;
  userId: number;
  useStatus: 0 | 1 | '0' | '1';
  updateTime: string;
  telephone: string;
  roleName: string;
  roleCode: string;
  userName: string;
};

export type OperateUserRequestParams = {
  companyCode: string[] | string;
  account?: string;
  password?: string;
  userName: string;
  phone: string;
  telephone: string;
  mailbox: string;
  businessGroupCode: string;
  roleCode: string;
  useStatus?: '0' | '1' | 0 | 1;
  userId?: number;
};
