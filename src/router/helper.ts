import { cloneDeep } from 'lodash-es';
import { MenuListEnum, TabListEnum } from '@/enums/menuEnum';
import { RouteListEnum } from '@/enums/routeEnum';
import { useI18n } from '@/hooks/web/useI18n';
import { useAppTabWithOutStore } from '@/store/modules/tabs';
import { PageEnum } from '@/enums/pageEnum';
import { MenuItem } from '@/API/sys/model/userModel';

let modules: Record<string, () => Promise<Recordable>>;

const tabStore = useAppTabWithOutStore();

const tabList = tabStore.getTabList;

function dynamicImport(modules, name: string) {
  const keys = Object.keys(modules);
  const matchKeys = keys.filter((key) => {
    const arr = key.split('/');
    const endStr = arr[arr.length - 1];
    const endFlag = endStr.endsWith('.vue') || endStr.endsWith('.tsx');
    return endFlag && endStr.split('.')[0] === name;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return modules[matchKey];
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
    return;
  } else {
    console.warn('在src/views/下找不到`' + name + '.vue` 或 `' + name + '.tsx`, 请自行创建!');
  }
}

export function translateTab(list: MenuItem[]) {
  const { t } = useI18n();
  // set tab translate
  const map = list.map((item) => ({
    title: t(`routes.${TabListEnum[item.parentId]}.${item.menuName}`),
    url: item.gourl,
  }));
  tabList.forEach((item) => {
    if (item.url === PageEnum.BASE_REDIRECT_HOME) {
      item.title = t('common.home');
      return;
    }
    const cur = map.find((val) => val.url === item.url || item.url.startsWith(val.url));
    if (cur) {
      item.title = cur.title;
    }
  });
}

// generate routes
export function generateRoutes(powerGroup, asyncRoutes) {
  const { children } = powerGroup;
  const routes = cloneDeep(asyncRoutes);
  const { t } = useI18n();
  modules = modules || import.meta.glob('../views/**/*.{vue,tsx}');

  const obj = {};

  children.forEach((item) => {
    const { parentId } = item;
    if (!obj[parentId]) {
      obj[parentId] = [item];
    } else {
      obj[parentId].push(item);
    }
  });

  Object.keys(obj).forEach((key) => {
    const item = obj[key];
    const arr = item.map((v) => {
      return {
        path: RouteListEnum[v.path] || v.path,
        name: v.menuName,
        component: dynamicImport(modules, v.component),
        meta: {
          title: v.title,
        },
      };
    });
    obj[key] = arr;
  });
  routes.forEach((item) => {
    const { name } = item;
    const list = obj[MenuListEnum[name]] ? obj[MenuListEnum[name]] : undefined;
    if (item.children) {
      item.children = item.children.concat(list);
    } else {
      item.children = list;
    }
  });
  // set language title
  routes.forEach((item) => {
    item.meta.title = t(`routes.${item.name}.${item.name}`);
    if (item.children) {
      item.children.forEach((child) => {
        child.meta.title = t(`routes.${item.name}.${child.name}`);
      });
    }
  });

  // translate tab
  translateTab(children);
  console.log(routes);
  return routes;
}
