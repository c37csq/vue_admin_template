import type { RouteLocationNormalized } from 'vue-router';
import { TabItem, useAppTabWithOutStore } from '@/store/modules/tabs';
import { ChildRouteEnum } from '@/enums/routeEnum';
import { HOME_PAGE_NAME, LOGIN_PAGE_NAME, PAGE_NOT_FOUND_NAME } from '@/router/constant';
import { isEmpty } from '@/utils/checkType';

export async function setRouteChange(to: RouteLocationNormalized) {
  const tabStore = useAppTabWithOutStore();
  const { path, name, params } = to;
  const { title } = to.meta;
  if (name === PAGE_NOT_FOUND_NAME || name === LOGIN_PAGE_NAME) {
    return;
  }
  const tab: TabItem = {
    url: path,
    title: `${!isEmpty(params) ? `${title} ${(params as any).id}` : title}`,
    closable: name === HOME_PAGE_NAME ? false : true,
  };
  const keys = Object.keys(ChildRouteEnum);
  const matchKeys = keys.filter((key) => {
    return path.startsWith(key);
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    tab.parentUrl = ChildRouteEnum[matchKey];
  }
  await tabStore.addTab(tab);
}
