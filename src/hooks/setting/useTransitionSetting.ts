import type { TransitionSetting } from '#/config';

import { computed } from 'vue';

import { useAppStore } from '@/store/modules/app';

export function useTransitionSetting() {
  const appStore = useAppStore();

  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress);

  const getPageLoading = computed(() => appStore.getPageLoading);

  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading;
  });

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }
  return {
    setTransitionSetting,

    getOpenNProgress,
    getPageLoading,
    getOpenPageLoading,
  };
}
