import { PageParams } from '@/API/common/model/requestModel';

export type OrderFormType = {
  userId: string | number;
  sellUserId: string | number;
  roleState: string | number;
  businessCodes: string;
  userName: string;
  checkStatus: string;
  inboundNumber: string;
  practicalSailingStartTime: string | undefined;
  practicalSailingOverTime: string | undefined;
  orderNumber: string;
  nextUserName: string;
  masterBillLading: string;
  container: string;
  shipsCode: string;
  voyage: string;
  clientName: string;
  sellUserName: string;
  businessGroupCode: string;
  cabinetTypeCode: string;
  orderType: string;
  payment: string;
  costBillingStatus: string;
  expectSailingStartTime: string | undefined;
  expectSailingOverTime: string | undefined;
  createStartTime: string | undefined;
  createOverTime: string | undefined;
  arrivalOverTime: string | undefined;
  arrivalStartTime: string | undefined;
  clearingCustomsStartTime: string | undefined;
  clearingCustomsOverTime: string | undefined;
  deliveryOverTime: string | undefined;
  deliveryStartTime: string | undefined;
  consigner: string;
  consignee: string;
  notifier: string;
  transferLoading: string;
  destination: string;
  shipCompany: string;
  bookingCabinAgency: string;
  transitClauseCode: string;
  oceanLaneCode: string;
  orderMaster: string;
};

export type OrderStatisticType = {
  abandonNumber: number;
  arriveCostNoNumber: number;
  arrivePortNumber: number;
  clearanceNumber: number;
  newNumber: number;
  productInNumber: number;
  productNumber: number;
  sailNumber: number;
  settleNumber: number;
  totalNumber: number;
  orderCabinet: string;
};

interface CabineStatusListItem {
  containerNo: string;
}

export interface OrderListItem {
  orderNumber: string;
  pseudoClientCode: string;
  masterBillLading: string;
  shipsCode: string;
  voyage: string;
  destination: string;
  userName: string;
  expectSailingDate: string;
  practicalSailingDate: string;
  customsNumber: number;
  orderCabinet: number;
  createTime: string;
  updateTime: string;
  orderType: number;
  orderStatus: number;
  billingStatus: number;
  cabineStatusList: CabineStatusListItem[];
}

export type OrderStatusType =
  | 'totalNumber'
  | 'newNumber'
  | 'abandonNumber'
  | 'settleNumber'
  | 'sailNumber'
  | 'arrivePortNumber'
  | 'clearanceNumber'
  | 'arriveCostNoNumber'
  | 'productInNumber'
  | 'productNumber';

export type RequestOrderListParams = OrderFormType & { orderStatus: string } & PageParams;

export type RequestOrderStatisticParams = OrderFormType;
