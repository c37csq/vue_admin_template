import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';
import {
  EXCEPTION_COMPONENT,
  HOME_PAGE_NAME,
  LAYOUT,
  LOGIN_PAGE_NAME,
  PAGE_NOT_FOUND_NAME,
  REDIRECT_NAME,
} from '@/router/constant';
import { PageEnum } from '@/enums/pageEnum';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: LOGIN_PAGE_NAME,
  component: () => import('@/views/sys/Login.vue'),
  meta: {
    title: '登陆页',
  },
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/sys/redirect.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: '404页面',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: '404页面',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const HomeRoute: AppRouteRecordRaw = {
  path: '/home',
  name: HOME_PAGE_NAME,
  component: LAYOUT,
  redirect: '/home/homePage',
  meta: {
    title: '首页',
    loaded: true,
  },
  children: [
    {
      path: 'homePage',
      name: HOME_PAGE_NAME,
      component: () => import('@/views/sys/Home.vue'),
      meta: {
        title: '首页',
        loaded: true,
      },
    },
  ],
};

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const asyncRoutes = [...routeModuleList];

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, HomeRoute, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE];
