import { PageEnum } from '@/enums/pageEnum';
import { TabItem } from '@/store/modules/tabs';
import { useLocale } from '@/locales/useLocale';
import { LOCALE } from '@/settings/localeSetting';

export function createDefaultCurrentTab(): TabItem {
  const { getLocale } = useLocale();
  if (getLocale.value === LOCALE.EN_US) {
    return {
      title: 'Home',
      url: PageEnum.BASE_REDIRECT_HOME,
      closable: false,
    };
  }
  return {
    title: '首页',
    url: PageEnum.BASE_REDIRECT_HOME,
    closable: false,
  };
}
