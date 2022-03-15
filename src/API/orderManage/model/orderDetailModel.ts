export interface OrderDetailFormType {
  orderId: string | number;
  orderNumber: string;
  businessCode: string;
  clientCode: string;
  userId: string | number;
  userName: string;
  nextUserId: string | number;
  nextUserName: string;
  sellUserId: string | number;
  sellUserName: string;
  checkStatus: number | string;
  orderType: number | string;
  orderStatus: number | string;
  billingStatus: number | string;
  costSum: number | string;
  expectSailingDate: string;
  expectDeliveryDate: string;
  practicalSailingDate: string;
  arrivalDate: string;
  clearingCustomsDate: string;
  deliveryDate: string;
  checkDate: string;
  updateTime: string;
  createTime: string;
  lockStatus: string | number;
  customerServiceCode: string;
  businessGroupCode: string;
  closingState: string | number;
  orderrAccessoryInfoList: OrderrAccessoryInfoListItem[];
  orderCabinetInfoList: OrderCabinetInfoListItem[];
  orderCabinetInfoPreplanList: OrderCabinetInfoPreplanListItem[];
}

export type OrderrAccessoryInfoListItem = {
  loading: boolean;
};

export type OrderCabinetInfoListItem = {
  cabinetTypeCode: string;
  cabinetNumberSize: string | number;
  cabinetNumber: string | number;
  cabinetSealNumber: string | number;
};

export type OrderCabinetInfoPreplanListItem = {
  show: boolean;
};

export interface RequestOrderDetailParams {
  orderNumber: string;
}
