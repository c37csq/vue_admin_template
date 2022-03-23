<template>
  <el-scrollbar>
    <div class="pageWrapper">
      <div class="pageTitle">
        <p class="page_title_text">{{ getCurrentTab.title }}：</p>
      </div>
      <div class="pageContent">
        <slot></slot>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTabs } from '@/hooks/web/useTab';

  export default defineComponent({
    name: 'PageWrapper',
    setup() {
      const { getCurrentTab } = useTabs();

      return {
        getCurrentTab,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .pageWrapper {
    background: #ffffff;
    padding: 20px;
    min-height: calc(100vh - 160px);
    box-sizing: border-box;

    .pageTitle {
      .page_title_text {
        font-size: 20px;
        font-weight: 550;
      }
    }

    .pageContent {
      padding-top: 20px;
    }
  }
</style>
