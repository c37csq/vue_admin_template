// Initial project configuration
import { useAppStore } from '@/store/modules/app';
import { ProjectConfig } from '#/config';
import projectSetting from '@/settings/projectSetting';
import { deepMerge } from '@/utils/tool';
import { PROJECT_CONFIG_KEY } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';
import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env';
import { useWatermark } from '@/hooks/web/useWatermark';

export function initAppConfigStore() {
  const appStore = useAppStore();
  let projectConfig: ProjectConfig = Persistent.getLocal(PROJECT_CONFIG_KEY) as ProjectConfig;
  projectConfig = deepMerge(projectSetting, projectConfig || {});

  // set config
  appStore.setProjectConfig(projectConfig);

  const { setWatermark } = useWatermark();

  setWatermark('c37 csq');

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
