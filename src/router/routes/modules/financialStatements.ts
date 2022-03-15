import { LAYOUT } from '@/router/constant';

const route = {
  path: '/home',
  name: 'financialStatements',
  component: LAYOUT,
  meta: {
    title: '财务报表',
    loaded: true,
  },
};

export default route;
