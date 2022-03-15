import { LAYOUT } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const route: AppRouteModule = {
  path: '/home',
  name: 'orderStatements',
  component: LAYOUT,
  meta: {
    title: '订单报表',
    loaded: true,
  },
};

export default route;
