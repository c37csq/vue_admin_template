<template>
  <el-scrollbar>
    <div class="pageWrapper">
      <div class="pageTitle">
        <p class="page_title_text">{{ title }}：</p>
      </div>
      <div class="pageContent">
        <slot></slot>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PageWrapper',
    props: {
      title: {
        type: String,
        required: true,
      }
    }
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
