import { defineStore } from 'pinia';
import { createLocalStorage } from '@/utils/cache';
import { LOCALE_KEY } from '@/enums/cacheEnum';
import { localeSetting } from '@/settings/localeSetting';
import { LocaleSetting, LocaleType } from '#/config';
import { store } from '@/store';

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localeInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localeInfo: lsLocaleSetting,
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localeInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localeInfo = { ...this.localeInfo, ...info };
      ls.set(LOCALE_KEY, this.localeInfo);
    },
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localeInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
