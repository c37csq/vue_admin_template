import { computed } from 'vue';
import { useAppTabWithOutStore } from '@/store/modules/tabs';

export function useTabSetting() {
  const tabStore = useAppTabWithOutStore();

  const getCurrentTab = computed(() => tabStore.getCurrentTab);

  const getTabList = computed(() => tabStore.getTabList);

  return {
    getTabList,
    getCurrentTab,
  };
}
