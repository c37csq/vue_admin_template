import { Router, useRouter } from 'vue-router';
import { computed, unref } from 'vue';
import { TabItem, useAppTabWithOutStore } from '@/store/modules/tabs';
import { useContextMenu } from '@/hooks/web/useContextMenu';
import { PageEnum } from '@/enums/pageEnum';

enum TableActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE,
}

export function useTabs(_router?: Router) {
  const tabStore = useAppTabWithOutStore();
  const router = _router || useRouter();
  const [createContextMenu] = useContextMenu();

  const getCurrentTab = computed(() => tabStore.getCurrentTab);

  const getTabList = computed(() => tabStore.getTabList);

  async function handleTabAction(action: TableActionEnum, tab?: TabItem) {
    switch (action) {
      case TableActionEnum.REFRESH:
        await tabStore.refreshPage(router);
        break;

      case TableActionEnum.CLOSE_ALL:
        await tabStore.closeAllTabs(router);
        break;

      case TableActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTabs(tab!);
        break;

      case TableActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTabs(tab!);
        break;

      case TableActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(tab!, router);
        break;

      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabStore.closeTab(tab!, router);
        break;
    }
  }

  function contextMenuClick(e: MouseEvent, item: TabItem) {
    const length = unref(getTabList).length;
    const index = unref(getTabList).findIndex((val) => val.url === item.url);
    const canReload = unref(getCurrentTab).url !== item.url;
    const canCloseOther = !(
      unref(getCurrentTab).url === item.url &&
      (item.url === PageEnum.BASE_REDIRECT_HOME
        ? unref(getTabList).length >= 2
        : unref(getTabList).length > 2)
    );
    const canCloseLeft =
      unref(getCurrentTab).url !== item.url ||
      index === 0 ||
      (index === 1 && !unref(getTabList)[0].closable);
    const canCloseRight =
      unref(getCurrentTab).url !== item.url ||
      index === length - 1 ||
      (index === length - 2 && !unref(getTabList)[length - 1].closable);
    createContextMenu({
      event: e,
      items: [
        {
          label: '重新加载',
          icon: 'reload',
          disabled: canReload,
          handler: async () => {
            await handleTabAction(0);
          },
        },
        {
          label: '关闭标签页',
          icon: 'close',
          disabled: !item.closable,
          handler: async () => {
            await handleTabAction(5, item);
          },
        },
        {
          label: '关闭左侧标签页',
          icon: 'left',
          disabled: canCloseLeft,
          handler: async () => {
            await handleTabAction(2, item);
          },
        },
        {
          label: '关闭右侧标签页',
          icon: 'right',
          disabled: canCloseRight,
          handler: async () => {
            await handleTabAction(3, item);
          },
        },
        {
          label: '关闭其他标签页',
          icon: 'other',
          disabled: canCloseOther,
          handler: async () => {
            await handleTabAction(4, item);
          },
        },
        {
          label: '关闭全部标签页',
          icon: 'total',
          disabled: length === 1,
          handler: async () => {
            await handleTabAction(1);
          },
        },
      ],
    });
  }

  return {
    refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TableActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TableActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
    close: (tab?: TabItem) => handleTabAction(TableActionEnum.CLOSE, tab),
    getTabList,
    getCurrentTab,
    contextMenuClick,
  };
}
