import type { LocaleType } from '#/config';
import { useLocaleStoreWithOut } from '@/store/modules/locale';
import { i18n } from './setupI18n';
import { loadLocalePool, setHtmlPageLang } from '@/locales/helper';
import { computed, unref } from 'vue';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);

  const getElementPlusLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.elementPlusLocale ?? {};
  });

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }
    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;
    const { message } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);
    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    changeLocale,
    getElementPlusLocale,
  };
}
