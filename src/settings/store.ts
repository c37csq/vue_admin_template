import { PageEnum } from '@/enums/pageEnum';
import { useI18n } from '@/hooks/web/useI18n';
import { TabItem } from '@/store/modules/tabs';

export function createDefaultCurrentTab(): TabItem {
  const { t } = useI18n();

  return {
    title: t('common.home'),
    url: PageEnum.BASE_REDIRECT_HOME,
    closable: false,
  };
}
