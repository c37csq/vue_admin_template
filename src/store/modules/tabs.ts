import { defineStore } from 'pinia';
import { Persistent } from '@/utils/cache/persistent';
import { CURRENT_TAB_KEY, MULTIPLE_TABS_LIST } from '@/enums/cacheEnum';
import { createDefaultCurrentTab } from '@/settings/store';
import projectSetting from '@/settings/projectSetting';
import { useAppStoreWithOut } from '@/store/modules/app';
import { store } from '@/store';
import { PageEnum } from '@/enums/pageEnum';
import type { Router, RouteRecordName } from 'vue-router';
import { useGo, useRedo } from '@/hooks/web/usePage';
import { unref } from 'vue';

export interface TabItem {
  title: string;
  name: RouteRecordName | null | undefined;
  url: string;
  parentUrl?: string;
  closable?: boolean;
  ignoreKeepAlive?: boolean;
}

export interface TabState {
  cacheTabList: Set<string>;
  tabList: TabItem[];
  currentTab: TabItem;
}

const cacheTab = projectSetting.multiTabsSetting.cache;

const CURRENT_TAB = createDefaultCurrentTab();

export const useAppTabStore = defineStore({
  id: 'app-tabs',
  state: (): TabState => ({
    // Tabs that need to be cached
    cacheTabList: new Set(),
    // tab list
    tabList: cacheTab
      ? Persistent.getSession<TabItem[]>(MULTIPLE_TABS_LIST) || [CURRENT_TAB]
      : [CURRENT_TAB],
    currentTab: Persistent.getSession<TabItem>(CURRENT_TAB_KEY) || CURRENT_TAB,
  }),
  getters: {
    getTabList(): TabItem[] {
      return this.tabList;
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList);
    },
    getCurrentTab(): TabItem {
      return this.currentTab;
    },
  },
  actions: {
    async updateCacheTab() {
      const cacheMap: Set<string> = new Set();
      for (const tab of this.tabList) {
        // Ignore the cache
        const needCache = !tab?.ignoreKeepAlive;
        if (!needCache) {
          continue;
        }
        const name = tab.name as string;
        cacheMap.add(name);
      }
      this.cacheTabList = cacheMap;
    },
    async refreshPage(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      const name = route.name;

      const findTab = this.getCachedTabList.find((item) => item === name);
      if (findTab) {
        this.cacheTabList.delete(findTab);
      }
      const redo = useRedo(router);
      await redo();
    },
    clearCacheTabs(): void {
      this.cacheTabList = new Set();
    },
    resetState(): void {
      this.setTabList([CURRENT_TAB]);
      this.setCurrentTab(CURRENT_TAB);
      this.clearCacheTabs();
    },
    setTabList(list: TabItem[]) {
      this.tabList = list;
      this.updateCacheTab();
      Persistent.setSession(MULTIPLE_TABS_LIST, list);
    },
    setCurrentTab(tab: TabItem) {
      this.currentTab = tab;
      this.updateCacheTab();
      Persistent.setSession(CURRENT_TAB_KEY, tab);
    },
    async addTab(item: TabItem) {
      const { url } = item;
      const tabList = this.getTabList;
      await this.setTab(item);
      if (tabList.find((v) => v.url === url)) {
        return;
      }
      if (url === PageEnum.BASE_REDIRECT_HOME) {
        return;
      }
      tabList.push(item);
      this.setTabList(tabList);
    },
    async setTab(item: TabItem) {
      const { url, parentUrl } = item;
      const appStore = useAppStoreWithOut();
      this.setCurrentTab(item);
      if (parentUrl) {
        appStore.setProjectConfig({
          menuSetting: {
            activeMenu: parentUrl,
          },
        });
      } else {
        appStore.setProjectConfig({
          menuSetting: {
            activeMenu: url,
          },
        });
      }
    },
    async closeTab(item: TabItem, router: Router) {
      const go = useGo(router);
      const index = this.tabList.findIndex((val) => val.url === item.url);
      if (this.currentTab.url === item.url) {
        const tab = this.tabList[index - 1];
        go(tab.url);
      }
      this.tabList.splice(index, 1);
      this.setTabList(this.tabList);
    },
    async closeLeftTabs(item: TabItem) {
      const curIndex = this.tabList.findIndex((val) => val.url === item.url);
      const filterArr = this.tabList.filter((item, index) => index >= curIndex || !item.closable);
      this.setTabList(filterArr);
    },
    async closeRightTabs(item: TabItem) {
      const curIndex = this.tabList.findIndex((val) => val.url === item.url);
      const filterArr = this.tabList.filter((item, index) => index <= curIndex || !item.closable);
      this.setTabList(filterArr);
    },
    async closeOtherTabs(item: TabItem, router: Router) {
      const go = useGo(router);
      const curIndex = this.tabList.findIndex((val) => val.url === item.url);
      const filterArr = this.tabList.filter((item, index) => index === curIndex || !item.closable);
      this.setTabList(filterArr);
      go(item.url);
    },
    async closeAllTabs(router: Router) {
      const go = useGo(router);
      this.resetState();
      go(PageEnum.BASE_HOME);
      await this.setTab(this.currentTab);
    },
  },
});

// Need to be used outside the setup
export function useAppTabWithOutStore() {
  return useAppTabStore(store);
}
