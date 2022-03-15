export enum MenuEnum {
  '订单管理' = 'orderManage',
  '订单确认' = 'orderConfirm',
  'CRM客户资源管理' = 'crmManage',
  '业务资源管理' = 'businessManage',
  '费用设置' = 'expenseSetting',
  '系统设置' = 'systemSetting',
  '基础类型设置' = 'baseTypeSetting',
  '财务结算收款' = 'financialSettlementCollection',
  '财务结算付款' = 'financialSettlementPayment',
  '财务报表' = 'financialReport',
  '订单报表' = 'orderReport',
}

export const MenuListEnum = {
  // 订单管理
  orderManage: 1,
  // 系统设置
  crmManage: 3,
  // 订单确认
  orderConfirm: 2,
  systemSetting: 6,
  expenseSetting: 5,
  businessManage: 4,
  baseTypeSetting: 7,
  financialSettlementCollection: 10,
  financialSettlementPayment: 11,
  financialStatements: 9,
  orderStatements: 12,
};

export const TabListEnum = {
  // 订单管理
  1: 'orderManage',
  3: 'crmManage',
  2: 'orderConfirm',
  6: 'systemSetting',
  5: 'expenseSetting',
  4: 'businessManage',
  7: 'baseTypeSetting',
  10: 'financialSettlementCollection',
  11: 'financialSettlementPayment',
  9: 'financialStatements',
  12: 'orderStatements',
};
