import { fmsHttp } from '@/utils/http/index';
import {
  OrderDetailFormType,
  RequestOrderDetailParams,
} from '@/API/orderManage/model/orderDetailModel';

enum Api {
  OrderDetail = '/order/border/info',
}

export function getOrderDetail(params: RequestOrderDetailParams) {
  return fmsHttp.get<OrderDetailFormType>({
    url: Api.OrderDetail,
    params,
  });
}
