import { useAppStoreWithOut } from '@/store/modules/app';
import { computed, unref } from 'vue';
import { MenuSetting } from '#/config';
import { useAppPermissionStoreWithOut } from '@/store/modules/permission';
import { triggerWindowResize } from '@/utils/event';

export function useMenuSetting() {
  const appStore = useAppStoreWithOut();
  const permissionStore = useAppPermissionStoreWithOut();

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  const getActiveMenu = computed(() => appStore.getMenuSetting.activeMenu);

  const getMenuList = computed(() => permissionStore.getMenuList);

  const getSubActiveMenu = computed(() => appStore.getMenuSetting.subActiveMenu);

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
    triggerWindowResize();
  }

  return {
    toggleCollapsed,

    getActiveMenu,
    getMenuList,
    getSubActiveMenu,
    getCollapsed,
  };
}
