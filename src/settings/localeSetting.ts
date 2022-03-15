import { LocaleSetting, LocaleType } from '#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

export interface LocaleItem {
  text: string;
  key: string;
}

// locale list
export const localeList: LocaleItem[] = [
  {
    text: '简体中文',
    key: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    key: LOCALE.EN_US,
  },
];
