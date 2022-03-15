<template>
  <el-config-provider :locale="getElementPlusLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTitle } from '@/hooks/web/useTitle';
  import { useLocale } from '@/locales/useLocale';

  export default defineComponent({
    name: 'App',
    setup() {
      const { getElementPlusLocale } = useLocale();
      useTitle();
      return {
        getElementPlusLocale,
      };
    },
  });
</script>
