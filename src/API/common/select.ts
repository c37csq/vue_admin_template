import { fmsHttp } from '@/utils/http/index';
import {
  AddressListItem,
  BusinessListItem,
  CabinetTypeListItem,
  CompanyItem,
  CustomerListItem,
  DeptListItem,
  OrderTypeListItem,
  PaymentListItem,
  RequestAddressListParams,
  RequestClientListParams,
  RequestDeptListParams,
  RequestSaleListParams,
  RequestSaleManListParams,
  RequestShippingPortListParams,
  RoleItem,
  SaleListItem,
  SaleManListItem,
  SectorItem,
  ShippingPortListItem,
  ShippingRoutesListItem,
  TransportClauseListItem,
} from '@/API/common/model/selectModel';
import { ResponseListType } from '@/API/common/model/responseModel';

enum Api {
  GetCompanyList = '/company/info/list/all',
  GetSectorList = '/sector/info',
  GetRoleList = '/role/info',
  GetBusinessList = '/system/business/code/list',
  GetDeptList = '/user/info/select/dept',
  GetCustomerList = '/client/info/list/select',
  GetSaleList = '/group/user/list/info',
  GetCabinetTypeList = '/cabinet/type/list',
  GetOrderTypeList = '/business/type/list',
  GetPaymentList = '/system/payment/list',
  GetShippingPortList = '/ocean/port/list',
  GetAddressList = '/client/info/list',
  GetTransportClauseList = '/transit/clause/list',
  GetShippingRoutesList = '/ocean/lane/list',
  GetSaleManList = '/CustomerRegistration/selectSales',
}

// get company list
export function getCompanyList() {
  return fmsHttp.get<CompanyItem[]>({ url: Api.GetCompanyList });
}

export function getSectorList() {
  return fmsHttp.get<SectorItem[]>({ url: Api.GetSectorList });
}

export function getRoleList() {
  return fmsHttp.get<RoleItem[]>({ url: Api.GetRoleList });
}

export function getBusinessList() {
  return fmsHttp.get<BusinessListItem[]>({ url: Api.GetBusinessList });
}

export function getDeptList(params: RequestDeptListParams) {
  return fmsHttp.get<DeptListItem[]>({ url: Api.GetDeptList, params });
}

export const inspectionList = [
  { label: '不查验', value: '0', key: '0' },
  { label: '查验完成', value: '1', key: '1' },
  { label: '查验中', value: '2', key: '2' },
];

export function getCustomerList(params: RequestClientListParams) {
  return fmsHttp.get<ResponseListType<CustomerListItem[]>>({ url: Api.GetCustomerList, params });
}

export function getSaleList(params: RequestSaleListParams) {
  return fmsHttp.get<SaleListItem[]>({ url: Api.GetSaleList, params });
}

export function getCabinetTypeList() {
  return fmsHttp.get<CabinetTypeListItem[]>({ url: Api.GetCabinetTypeList });
}

export function getOrderTypeList() {
  return fmsHttp.get<OrderTypeListItem[]>({ url: Api.GetOrderTypeList });
}

export function getPaymentList() {
  return fmsHttp.get<PaymentListItem[]>({ url: Api.GetPaymentList });
}

export const costBillingStatusList = [
  { label: '未计费', value: '0', key: '0' },
  { label: '未提交', value: '1', key: '1' },
  { label: '审核中', value: '2', key: '2' },
  { label: '审核完成', value: '3', key: '3' },
];

export function getShippingPortList(params: RequestShippingPortListParams) {
  return fmsHttp.get<ShippingPortListItem[]>({ url: Api.GetShippingPortList, params });
}

// M 订舱代理  B 船公司
export function getAddressList(params: RequestAddressListParams) {
  return fmsHttp.get<ResponseListType<AddressListItem[]>>({
    url: Api.GetAddressList,
    params: {
      pageNum: 1,
      pageSize: 8,
      ...params,
    },
  });
}

export function getTransportClauseList() {
  return fmsHttp.get<TransportClauseListItem[]>({ url: Api.GetTransportClauseList });
}

export function getShippingRoutesList() {
  return fmsHttp.get<ShippingRoutesListItem[]>({ url: Api.GetShippingRoutesList });
}

export const orderMasterList = [
  { id: 1, orderMasterName: '收入已完全核销' },
  { id: 2, orderMasterName: '收入未完全核销' },
  { id: 3, orderMasterName: '支出已完全核销' },
  { id: 4, orderMasterName: '支出未完全核销' },
];

export function getSaleManList(params: RequestSaleManListParams) {
  return fmsHttp.get<SaleManListItem[]>({ url: Api.GetSaleManList, params });
}
