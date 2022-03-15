import { defineComponent } from 'vue';
import type { RouteRecordRaw, RouteMeta } from 'vue-router';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

// export interface Menu {
//   title: string;
//
//   type: number;
//
//   src: Nullable<string>;
//
//   path: string;
//
//   menuName: Nullable<string>;
//
//   menuKey: number;
//
//   menuId: number;
//
//   key: string;
//
//   gourl: string;
//
//   component: string;
//
// }

export type AppRouteModule = AppRouteRecordRaw;
