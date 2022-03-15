<template>
  <div class="tabs">
    <el-tabs
      type="card"
      :model-value="getCurrentTab.url"
      @tab-click="handleTabClick"
      @tab-remove="handleRemoveTab"
    >
      <el-tab-pane
        v-for="item in getTabList"
        :closable="item.closable"
        :key="item.url"
        :label="item.title"
        :name="item.url"
      />
    </el-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useAppTabStore } from '@/store/modules/tabs';
  import { useTabSetting } from '@/hooks/setting/useTabSetting';
  import { useGo } from '@/hooks/web/usePage';

  export default defineComponent({
    name: 'Tabs',
    setup() {
      const tabStore = useAppTabStore();
      const go = useGo();
      const { getCurrentTab, getTabList } = useTabSetting();

      // del tab
      const handleRemoveTab = async (val: string) => {
        const { tabList, currentTab } = tabStore;
        const index = tabList.findIndex((item) => item.url === val);

        if (currentTab.url === val) {
          const tab = tabList[index - 1];
          go(tab.url);
        }
        tabList.splice(index, 1);
        tabStore.setTabList(tabList);
      };

      // click tab
      const handleTabClick = async (val) => {
        const { name } = val.props;
        go(name);
      };

      return {
        getTabList,
        getCurrentTab,

        handleRemoveTab,
        handleTabClick,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/styles/variable.scss';

  .tabs {
    height: $tabs-bg-height;
  }
</style>
<style lang="scss">
  @import '@/styles/variable.scss';

  .tabs {
    margin-right: 16px;
    margin-left: 16px;
    .el-tabs {
      width: 100%;
      height: 100%;
      background: #ffffff;

      .el-tabs__header {
        height: 100%;
        box-sizing: border-box;
        margin-bottom: 0 !important;

        .el-tabs__nav-prev,
        .el-tabs__nav-next {
          line-height: 45px !important;
        }

        .el-tabs__nav {
          border-top: none !important;
          border-bottom: none !important;
          border-radius: 0;

          .el-tabs__item {
            line-height: $tabs-bg-height;
            border-bottom: none !important;

            .is-icon-close svg {
              margin-left: 1px;
            }
          }

          .el-tabs__item:not(.is-active):hover {
            color: #000000;
          }
        }
      }

      .is-top {
        height: 100% !important;
      }

      .el-tabs__content {
        display: none;
      }
    }
  }
</style>
