import { CacheTypeEnum } from '@/settings/storageSetting';

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}

export interface MenuSetting {
  collapsed: boolean;
  activeMenu: string;
  subActiveMenu: string;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  canDrag: boolean;
}

export interface TransitionSetting {
  openPageLoading: boolean;

  // Whether to open the top progress bar
  openNProgress: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface ProjectConfig {
  cacheType: CacheTypeEnum;
  removeAllHttpPending: boolean;
  closeMessageOnSwitch: boolean;
  // menu setting
  menuSetting: MenuSetting;
  // tabs setting
  multiTabsSetting: MultiTabsSetting;
  transitionSetting: TransitionSetting;
  openKeepAlive: boolean;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}

export type LocaleType = 'zh_CN' | 'en';
