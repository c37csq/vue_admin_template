import { LAYOUT } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const route: AppRouteModule = {
  path: '/home',
  name: 'orderConfirm',
  component: LAYOUT,
  meta: {
    title: '订单确认',
    loaded: true,
  },
};

export default route;
