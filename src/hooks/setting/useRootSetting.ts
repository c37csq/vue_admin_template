import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';

export function useRootSetting() {
  const appStore = useAppStore();

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive);

  return {
    getOpenKeepAlive,
  };
}
