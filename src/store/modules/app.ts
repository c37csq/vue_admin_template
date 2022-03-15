import { defineStore } from 'pinia';
import { Persistent } from '@/utils/cache/persistent';
import { PROJECT_CONFIG_KEY } from '@/enums/cacheEnum';
import { MenuSetting, MultiTabsSetting, ProjectConfig, TransitionSetting } from '#/config';
import { deepMerge } from '@/utils/tool';
import { resetRouter } from '@/router';
import { store } from '@/store';

interface AppState {
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJECT_CONFIG_KEY),
  }),
  getters: {
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJECT_CONFIG_KEY, this.projectConfig);
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    setPageMountedLoading(list) {
      this.setPageLoading(true);
      Promise.all(list).then((_) => {
        this.setPageLoading(false);
      });
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
