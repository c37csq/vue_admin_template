<template>
  <div :class="`App-Logo ${getCollapsed ? 'collapse' : 'expand'}`">
    <div @click="goHome" :class="getCollapsed ? 'collapse' : 'expand'"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';

  export default defineComponent({
    name: 'AppLogo',
    setup() {
      const { getCollapsed } = useMenuSetting();
      const go = useGo();

      // jump home
      function goHome() {
        go(PageEnum.BASE_HOME);
      }

      return {
        getCollapsed,

        goHome,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  .App-Logo {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.3s;
    height: $logo-height;
    background: $logo-bg-color;
    cursor: pointer;
    .expand {
      width: $logo-expand-width;
      height: $logo-expand-height;
      background-image: url('@/assets/images/logo.png');
      background-size: 100% 100%;
    }
    .collapse {
      width: $logo-collapse-width;
      height: $logo-collapse-height;
      background-image: url('@/assets/images/logo.png');
      background-repeat: no-repeat;
      background-size: 290%;
      background-position: -10% center;
    }
  }

  .App-Logo.collapse {
    width: 100%;
  }

  .App-Logo.expand {
    width: 100%;
  }
</style>
