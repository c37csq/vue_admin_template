import { PageParams } from '@/API/common/model/requestModel';

export interface CompanyItem {
  address: string;
  checker: string;
  companyCode: string;
  companyId: number;
  companyName: string;
  companyNameEn: string;
  createTime: string;
  organizationCode: string;
  payee: string;
  phone: string;
  updateTime: string;
  useStatus: number;
  fax: string;
  linkman: string;
  mailbox: string;
}

export interface SectorItem {
  businessGroupCode: string;
  businessGroupName: string;
}

export interface RoleItem {
  roleCode: string;
  roleName: string;
}

export interface BusinessListItem {
  businessType: number;
  businessId: number;
  businessTypeName: string;
  businessCode: string;
  businessName: string;
  createTime: string;
  updateTime: Nullable<string>;
}

export interface DeptListItem {
  userId: string;
  userName: string;
}

export interface RequestDeptListParams {
  businessGroupCode: string;
  roleName: string;
}

export interface RequestClientListParams {
  clientName?: string | undefined;
  type?: string | undefined;
}

export interface RequestSaleListParams {
  userId: number | string;
  userName: string;
}

export type RequestShippingPortListParams = {
  portEnglishName: string;
} & PageParams;

export type RequestAddressListParams = {
  clientRoleCode: string;
  clientName: string;
};

export interface RequestSaleManListParams {
  businessGroupCode: string;
  userName: string;
}

export interface CabinetTypeListItem {
  cabinetTypeCode: string;
  cabinetTypeName: string;
}

export interface OrderTypeListItem {
  businessTypeName: string;
  businessTypeId: string;
}

export interface PaymentListItem {
  packagingCode: string;
  paymentName: string;
  paymentCode: string;
}

export interface ShippingPortListItem {
  portEnglishName: string;
  oceanPortCode: string;
}

export interface AddressListItem {
  clientCode: string;
  clientName: string;
  ladingContents: string;
}

export interface CustomerListItem {
  clientCode: string;
  clientName: string;
  userId: number;
  userName: string;
  nextUserId: number;
  nextUserName: string;
  sellUserId: number;
  sellUserName: string;
  ladingContents: string;
  businessGroupCode: string;
  businessGroupName: string;
}

export interface SaleListItem {
  id: number;
  label: string;
  name: string;
}

export interface TransportClauseListItem {
  transitClauseCode: string;
}

export interface ShippingRoutesListItem {
  oceanLaneCode: string;
  laneChineseName: string;
}

export interface SaleManListItem {
  userId: number;
  userName: string;
}
