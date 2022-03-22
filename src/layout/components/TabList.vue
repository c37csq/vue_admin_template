<template>
  <div class="tabListWrap">
    <div class="tabList" ref="tabListRef">
      <div
        ref="tabItemRef"
        :class="['tab_item', getCurrentTab.url === item.url ? 'tab_active' : '']"
        v-for="item in getTabList"
        :key="item.url"
        @click="handleTabClick(item)"
        @dragstart="(e) => onDragStart(e, item)"
        @dragend="onDragEnd"
        @dragenter="onDragEnter(item)"
        @contextmenu.prevent="(e: MouseEvent) => contextMenuClick(e, item)"
        draggable="true"
      >
        <div class="tab_content">
          <span class="tab_text">{{ item.title }}</span>
        </div>
        <div
          @click="(e: Event) => handleRemoveTab(e, item)"
          v-if="item.closable"
          :class="['tab_close']"
        >
          <SvgIcon
            size="14"
            :color="getCurrentTab.url === item.url ? '#ffffff' : 'rgb(0, 0, 0)'"
            name="close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, ref, unref } from 'vue';
  import { TabItem, useAppTabStore } from '@/store/modules/tabs';
  import { useGo } from '@/hooks/web/usePage';
  import { swapArray } from '@/utils/tool';
  import { TransitionEnum } from '@/enums/transitionEnum';
  import { useTabs } from '@/hooks/web/useTab';
  import { useRouter } from 'vue-router';
  import { useTabSetting } from '@/hooks/setting/useTabSetting';

  export default defineComponent({
    name: 'TabList',
    setup() {
      const tabStore = useAppTabStore();
      const go = useGo();
      const { getCanDrag } = useTabSetting();
      const { getCurrentTab, getTabList, contextMenuClick } = useTabs();
      const curDragInfo = ref(null) as Ref<Nullable<TabItem>>;
      const curDragDom = ref(null) as Ref<Nullable<HTMLElement>>;
      const curIndex = ref(-1);
      const targetDragIndex = ref(-1);
      const tabListRef = ref(null);
      const router = useRouter();
      let timeoutId = ref() as Ref<TimeoutHandle>;
      const lock = ref(false);

      // click tab
      const handleTabClick = async (val) => {
        const { url } = val;
        go(url);
      };

      // del tab
      const handleRemoveTab = async (e: Event, val: TabItem) => {
        e?.stopPropagation();
        await tabStore.closeTab(val, router);
      };

      function onDragStart(e: MouseEvent, item: TabItem) {
        if (!unref(getCanDrag)) {
          e.preventDefault();
          return;
        }
        const dragIndex = unref(getTabList).findIndex((val) => val.url === item.url);
        const dragDom = document.querySelectorAll('.tabList .tab_item')[dragIndex] as HTMLElement;
        curDragDom.value = dragDom;
        curDragInfo.value = item;
        curIndex.value = dragIndex;
      }

      function onDragEnd() {
        curDragInfo.value = null;
        curDragDom.value = null;
        curIndex.value = -1;
      }

      // drag center code
      function onDragEnter(item: TabItem) {
        if (!lock.value) {
          const { url } = item;
          if (curDragInfo.value!.url === url) {
            return;
          }
          const targetIndex = unref(getTabList).findIndex((item) => item.url === url);
          targetDragIndex.value = targetIndex;
          const targetDom = document.querySelectorAll('.tabList .tab_item')[
            targetIndex
          ] as HTMLElement;

          const targetLeft = targetDom.getBoundingClientRect().left;
          const curLeft = unref(curDragDom)!.getBoundingClientRect().left;

          // some styles
          const computedStyle = getComputedStyle(unref(curDragDom) as Element, null);
          const margin = Number(computedStyle.marginLeft.replace('px', ''));
          const curWidth = unref(curDragDom)!.offsetWidth;
          const targetWidth = targetDom.offsetWidth;
          const childrenList = Array.from(
            (unref(tabListRef) as Nullable<Element>)!.querySelectorAll('.tabList .tab_item'),
          ) as HTMLElement[];
          const distance = (targetLeft - curLeft) as number;
          if (distance > 0) {
            const list = childrenList.filter(
              (_, index) => index > unref(curIndex) && index <= unref(targetDragIndex),
            );
            list.forEach((item) => {
              (item as HTMLElement)!.style.transition = `${TransitionEnum.TAB_DUARTION}s`;
              (item as HTMLElement)!.style.transform = `translateX(-${curWidth + margin * 2}px)`;
            });
            let translateDis = distance + targetWidth - curWidth;
            unref(curDragDom)!.style.transition = `${TransitionEnum.TAB_DUARTION}s`;
            unref(curDragDom)!.style.transform = `translateX(${translateDis}px)`;
            const sortTabList = swapArray(
              unref(getTabList),
              unref(curIndex),
              unref(targetIndex),
              true,
            );
            lock.value = true;
            clearTimeout(unref(timeoutId));
            timeoutId.value = setTimeout(() => {
              tabStore.setTabList(sortTabList);
              Array.from(childrenList).forEach((item) => {
                (item as HTMLElement).style.transition = 'none';
                (item as HTMLElement).style.transform = `none`;
              });
              lock.value = false;
            }, TransitionEnum.TAB_DUARTION * 1000);
          } else {
            const list = childrenList.filter(
              (_, index) => index >= unref(targetIndex) && index < unref(curIndex),
            );
            list.forEach((item) => {
              (item as HTMLElement).style.transition = `${TransitionEnum.TAB_DUARTION}s`;
              (item as HTMLElement).style.transform = `translateX(${curWidth + margin * 2}px)`;
            });
            unref(curDragDom)!.style.transition = `${TransitionEnum.TAB_DUARTION}s`;
            unref(curDragDom)!.style.transform = `translateX(${distance}px)`;
            const sortTabList = swapArray(
              unref(getTabList),
              unref(curIndex),
              unref(targetIndex),
              false,
            );
            lock.value = true;
            clearTimeout(unref(timeoutId));
            timeoutId.value = setTimeout(() => {
              tabStore.setTabList(sortTabList);
              Array.from(childrenList).forEach((item) => {
                (item as HTMLDivElement).style.transition = 'none';
                (item as HTMLDivElement).style.transform = `none`;
              });
              lock.value = false;
            }, TransitionEnum.TAB_DUARTION * 1000);
          }
          curIndex.value = targetIndex;
        }
      }

      return {
        getTabList,
        getCurrentTab,
        tabListRef,

        handleTabClick,
        onDragStart,
        onDragEnd,
        handleRemoveTab,
        onDragEnter,
        contextMenuClick,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .tabListWrap {
    width: 100%;
    padding: 0 16px;
    background: rgb(245, 245, 245);
    box-sizing: border-box;
    height: 50px;
    position: relative;
    overflow: hidden;

    ::-webkit-scrollbar {
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgb(0 0 0 / 20%);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: rgb(0 0 0 / 30%);
    }

    ::-webkit-scrollbar-thumb:active {
      background: rgb(0 0 0 / 40%);
    }

    .tabList {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      position: relative;
      padding-top: 6px;
      background: #ffffff;
      box-sizing: border-box;
      overflow-y: hidden;
      overflow-x: hidden;

      .tab_item {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        height: 38px;
        cursor: pointer;
        padding: 0 12px;
        margin: 0 3px;
        border: 1px solid #e5e7eb;
        border-radius: 2px;
        transition: none;
        transform: none;
        flex-shrink: 0;

        .tab_close {
          width: 14px;
          height: 14px;
          padding-left: 5px;
          visibility: hidden;
        }

        .tab_close:hover {
          transform: scale(1.18, 1.18);
        }
      }

      .tab_item:hover {
        .tab_close {
          visibility: visible;
        }

        .tab_content {
          .tab_text {
            color: #409eff;
          }
        }
      }

      .tab_active {
        background: #0960bd;
        border: 0;

        .tab_content {
          .tab_text {
            color: #ffffff !important;
          }
        }

        .tab_close {
          visibility: visible;
        }
      }
    }

    .tabList:hover {
      overflow-x: auto;
    }
  }
</style>
<style lang="scss">
  .tabList {
    .el-scrollbar {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .el-scrollbar__view {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
  }
</style>
