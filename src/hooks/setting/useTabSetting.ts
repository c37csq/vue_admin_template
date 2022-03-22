import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { MultiTabsSetting } from '#/config';

export function useTabSetting() {
  const appStore = useAppStore();

  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show);

  const getCanDrag = computed(() => appStore.getMultiTabsSetting.canDrag);

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    appStore.setProjectConfig({ multiTabsSetting });
  }

  return {
    getShowMultipleTab,
    getCanDrag,

    setMultipleTabSetting,
  };
}
