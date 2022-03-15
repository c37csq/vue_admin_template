import echarts from '@/utils/lib/echarts';
import type { EChartsOption } from 'echarts';
import { computed, nextTick, ref, Ref, unref } from 'vue';
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core';
import { useTimeoutFn } from '@/hooks/core/useTimeout';
import { useEventListener } from '@/hooks/event/useEventListener';
import { useBreakpoint } from '@/hooks/event/useBreakpoint';

export function useECharts(elRef: Ref<HTMLDivElement>) {
  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: Fn = resize;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let removeResizeFn: Fn = () => {};

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(() => {
    return cacheOptions.value as EChartsOption;
  });

  function initCharts() {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
