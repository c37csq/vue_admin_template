import { defineStore } from 'pinia';
import { Persistent } from '@/utils/cache/persistent';
import { CURRENT_TAB_KEY, MULTIPLE_TABS_LIST } from '@/enums/cacheEnum';
import { createDefaultCurrentTab } from '@/settings/store';
import projectSetting from '@/settings/projectSetting';
import { useAppStoreWithOut } from '@/store/modules/app';
import { store } from '@/store';
import { PageEnum } from '@/enums/pageEnum';

export interface TabItem {
  title: string;
  url: string;
  parentUrl?: string;
  closable?: boolean;
}

export interface TabState {
  tabList: TabItem[];
  currentTab: TabItem;
}

const cacheTab = projectSetting.multiTabsSetting.cache;

const CURRENT_TAB = createDefaultCurrentTab();

export const useAppTabStore = defineStore({
  id: 'app-tabs',
  state: (): TabState => ({
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
    getCurrentTab(): TabItem {
      return this.currentTab;
    },
  },
  actions: {
    resetState(): void {
      this.setTabList([CURRENT_TAB]);
      this.setCurrentTab(CURRENT_TAB);
    },
    setTabList(list: TabItem[]) {
      this.tabList = list;
      Persistent.setSession(MULTIPLE_TABS_LIST, list);
    },
    setCurrentTab(tab: TabItem) {
      this.currentTab = tab;
      Persistent.setSession(CURRENT_TAB_KEY, tab);
    },
    async addTab(item: TabItem) {
      const { url } = item;
      const tabList = this.getTabList;
      if (this.currentTab.url === url) {
        return;
      }
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
  },
});

// Need to be used outside the setup
export function useAppTabWithOutStore() {
  return useAppTabStore(store);
}
