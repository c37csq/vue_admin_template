import { unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useGlobSetting } from '@/hooks/setting';

export function useTitle() {
  const { currentRoute } = useRouter();
  const { title } = useGlobSetting();

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute);
      const pageTitle = usePageTitle();

      const tTitle = route?.meta?.title;
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
