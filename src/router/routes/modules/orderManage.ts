import { LAYOUT } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const route: AppRouteModule = {
  path: '/home',
  name: 'orderManage',
  component: LAYOUT,
  meta: {
    title: '订单管理',
    loaded: true,
  },
};

export default route;
