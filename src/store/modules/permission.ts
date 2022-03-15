import type { AppRouteRecordRaw } from '@/router/types';

import { defineStore } from 'pinia';
import { asyncRoutes } from '@/router/routes';
import { MenuEnum } from '@/enums/menuEnum';
import { MenuItem } from '@/API/sys/model/userModel';
import { generateRoutes } from '@/router/helper';
import { useUserStoreWithOut } from '@/store/modules/user';
import { store } from '@/store';
import { useI18n } from '@/hooks/web/useI18n';

interface PermissionState {
  menuList: MenuItem[];
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
}

export const useAppPermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // menu List
    menuList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
  }),
  getters: {
    getMenuList(): MenuItem[] {
      return this.menuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setMenuList(list: MenuItem[]) {
      this.menuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.menuList = [];
      this.lastBuildMenuTime = 0;
    },
    async buildMenusAction(menuGroup: MenuItem[]) {
      const { t } = useI18n();
      // set icon set language
      menuGroup.forEach((item) => {
        item.src = MenuEnum[item.title];
        item.children.forEach((child) => {
          child.title = t(`routes.${item.src}.${child.menuName}`);
        });
        item.title = t(`routes.${item.src}.${item.src}`);
      });
      return menuGroup;
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStoreWithOut();

      const { powerGroup, menuGroup } = userStore.getPowerInfo;
      const menuList = await this.buildMenusAction(menuGroup);
      // set menu
      this.setMenuList(menuList);
      // set routes
      const routes = generateRoutes(powerGroup, asyncRoutes);

      return routes;
    },
  },
});

// Need to be used outside the setup
export function useAppPermissionStoreWithOut() {
  return useAppPermissionStore(store);
}
