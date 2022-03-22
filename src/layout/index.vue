<template>
  <div class="layout">
    <el-container class="max-h-screen">
      <el-aside class="h-screen" :width="getCollapsed ? '64px' : '210px'">
        <AppLogo />
        <SlideLeft ref="slideRef" />
      </el-aside>

      <el-container class="max-h-screen">
        <el-header>
          <Header />
          <TabList />
        </el-header>
        <el-main
          v-loading="getOpenPageLoading && getPageLoading"
          element-loading-svg-view-box="-10, -10, 50, 50"
          :element-loading-spinner="loadingSvg"
        >
          <router-view>
            <template #default="{ Component, route }">
              <transition name="fade-slide" mode="out-in" appear>
                <keep-alive v-if="openCache" :include="getCaches">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
                <component v-else :is="Component" :key="route.fullPath" />
              </transition>
            </template>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
  import SlideLeft from './components/SlideLeft.vue';
  import AppLogo from './components/AppLogo.vue';
  import Header from './components/Header.vue';
  import TabList from './components/TabList.vue';
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
  import { useAppTabStore } from '@/store/modules/tabs';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { useTabSetting } from '@/hooks/setting/useTabSetting';

  export default defineComponent({
    name: 'LAYOUT',
    components: {
      SlideLeft,
      AppLogo,
      Header,
      TabList,
    },
    setup() {
      const { getCollapsed } = useMenuSetting();
      const tabStore = useAppTabStore();
      const { getOpenKeepAlive } = useRootSetting();
      const slideRef = ref();
      const { getOpenPageLoading, getPageLoading } = useTransitionSetting();
      const { getShowMultipleTab } = useTabSetting();
      const loadingSvg = `<svg t="1646188688250" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4876" width="32" height="32"><path d="M204.8 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#EBF2FC" p-id="4877"></path><path d="M819.2 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#B5D2F3" p-id="4878"></path><path d="M819.2 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#7FB0EA" p-id="4879"></path><path d="M204.8 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#4A90E2" p-id="4880"></path></svg>`;
      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
          return [];
        }
        return tabStore.getCachedTabList;
      });

      // 关闭指定菜单
      const closeMenu = () => {
        slideRef.value.closeSubMenu();
      };

      return {
        slideRef,
        getCollapsed,
        getOpenPageLoading,
        getPageLoading,
        loadingSvg,
        getCaches,
        openCache,

        closeMenu,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .el-aside {
    transition: width 0.3s;
    overflow-y: hidden;
  }

  .el-main {
    padding: 0;
    margin: 16px;
    height: calc(100vh - 140px);
  }

  .el-main,
  .el-container {
    overflow: hidden !important;
  }
</style>
