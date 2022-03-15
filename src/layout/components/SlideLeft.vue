<template>
  <el-scrollbar class="menu_wrapper h-full">
    <el-menu
      ref="menuRef"
      @open="handleSubMenuOpen"
      text-color="#ffffffb3"
      active-text-color="#ffffff"
      background-color="rgb(11, 25, 40)"
      class="el-menu-vertical h-full"
      :default-active="getActiveMenu"
      :collapse="getCollapsed"
      unique-opened
      collapse-transition
    >
      <el-sub-menu v-for="menuItem in getMenuList" :index="menuItem.key" :key="menuItem.key">
        <template #title>
          <SvgIcon :name="menuItem.src || ''" />
          <span>{{ menuItem.title }}</span>
        </template>
        <el-menu-item
          v-for="child in menuItem.children"
          :index="child.gourl"
          :key="child.gourl"
          @click="handleMenuClick(child)"
        >
          {{ child.title }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, watch } from 'vue';
  import { useAppPermissionStore } from '@/store/modules/permission';
  import { useAppStore } from '@/store/modules/app';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useGo } from '@/hooks/web/usePage';
  import { useRouter } from 'vue-router';
  import { HOME_PAGE_NAME } from '@/router/constant';
  import { MenuItem } from '@/API/sys/model/userModel';

  export default defineComponent({
    name: 'SlideLeft',
    setup() {
      const permissionStore = useAppPermissionStore();
      const appStore = useAppStore();
      const { getActiveMenu, getCollapsed, getMenuList, getSubActiveMenu } = useMenuSetting();
      const menuRef = ref();
      const go = useGo();
      const router = useRouter();

      watch(
        () => router.currentRoute.value,
        (newValue) => {
          const { name } = newValue;
          if (name === HOME_PAGE_NAME) {
            closeSubMenu();
          }
        },
      );

      // 菜单点击事件
      const handleMenuClick = async (item: MenuItem) => {
        go(item.gourl);
      };

      // 菜单打开回调
      const handleSubMenuOpen = (val: string) => {
        appStore.setProjectConfig({
          menuSetting: {
            subActiveMenu: val,
          },
        });
      };

      // close sub menu
      const closeSubMenu = () => {
        if (unref(menuRef)) {
          unref(menuRef).close(unref(getSubActiveMenu));
        }
      };

      return {
        getActiveMenu,
        getCollapsed,
        permissionStore,
        menuRef,
        getMenuList,

        handleMenuClick,
        handleSubMenuOpen,
        closeSubMenu,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/styles/variable.scss';

  .menu_wrapper {
    background: $menu-bg-color;
    height: calc(100% - $logo-height);

    .el-menu-vertical {
      border: none;
    }

    .el-menu-vertical:not(.el-menu--collapse) {
      width: $menu-expand-width;
    }

    .el-menu-vertical.el-menu--collapse {
      width: $menu-collapse-width;

      .el-sub-menu.is-active::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background-color: $menu-active-color;
        content: '';
      }
    }

    .el-menu-item:hover {
      background: $menu-bg-color;
      color: #ffffff;
    }

    .el-menu-item.is-active {
      background: $menu-active-color !important;
    }
  }
</style>
<style lang="scss">
  .el-sub-menu__title svg {
    color: rgba(255, 255, 255, 0.7) !important;
    margin-right: 5px;
  }

  .menu_wrapper .el-sub-menu__title:hover,
  .el-sub-menu.is-active .el-sub-menu__title {
    display: flex;
    align-items: center !important;
    color: #ffffff !important;

    svg {
      color: #ffffff !important;
    }
  }
</style>
