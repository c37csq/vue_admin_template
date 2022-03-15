import { fmsHttp } from '@/utils/http/index';
import {
  RequestOrderListParams,
  RequestOrderStatisticParams,
} from '@/API/orderManage/model/orderListModel';

enum Api {
  OrderStatistics = '/order/border/statistics',
  OrderList = '/order/border',
}

export function getOrderStatistic(params: RequestOrderStatisticParams) {
  return fmsHttp.get({
    url: Api.OrderStatistics,
    params,
  });
}

export function getOrderList(params: RequestOrderListParams) {
  return fmsHttp.get({
    url: Api.OrderList,
    params,
  });
}
