import { LAYOUT } from '@/router/constant';

const route = {
  path: '/home',
  name: 'financialSettlementPayment',
  component: LAYOUT,
  meta: {
    title: '财务结算付款',
    loaded: true,
  },
  children: [
    {
      path: 'payableDetail/:id',
      name: 'payableDetail',
      component: () => import('@/views/financialSettlementPayment/payableDetail.vue'),
      meta: {
        title: '应付发票',
        hideBreadcrumb: true,
      },
    },
  ],
};

export default route;
