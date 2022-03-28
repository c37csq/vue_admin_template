import { fmsHttp } from '@/utils/http';
import { OrderCountInfo, OrderNumListItem } from '@/API/sys/model/homeModel';

enum Api {
  GetOrderCountInfo = '/getCountInfo',
  GetChartData = '/getChartData',
}

export function getOrderCount() {
  return fmsHttp.get<OrderCountInfo[]>({ url: Api.GetOrderCountInfo });
}

export function getChartData(params: { statisticsType: string }) {
  return fmsHttp.get<OrderNumListItem[]>({ url: Api.GetChartData, params });
}
