export interface OrderCountInfo {
  totalNumber: number;
  deliveryTimeout: number;
  checkTimeout: number;
  costEntryTimeout: number;
  costTakeTimeout: number;
  productDataSize: number;
  shipmentTimeout: number;
}

export interface OrderNumListItem {
  statisticCount: number;
  statisticData: string;
}
