/*
 * @Author: c37csq
 * @Date: 2021-12-Fr 09:42:06
 * @Last Modified by:   c37csq
 * @Last Modified time: 2021-12-Fr 09:42:06
 */

import { defineStore } from 'pinia';
import { UserInfo } from '#/store';
import { LoginParams, PowerInfo } from '@/API/sys/model/userModel';
import { ErrorMessageMode } from '#/axios';
import { getUserInfo, getUserPowerInfo, loginApi, updateToken } from '@/API/sys/user';
import { router } from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import {
  POWER_INFO_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  COMPANY_KEY,
  DEFAULT_COMPANY_CODE,
} from '@/enums/cacheEnum';
import { PageEnum } from '@/enums/pageEnum';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes';
import { useAppPermissionStoreWithOut } from '@/store/modules/permission';
import { store } from '@/store';
import { useAppTabWithOutStore } from '@/store/modules/tabs';
import { useAppStoreWithOut } from '@/store/modules/app';

interface UserState {
  userInfo: Nullable<UserInfo>;
  powerInfo: Nullable<PowerInfo>;
  token?: string;
  companyCode?: string;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useAppUserStore = defineStore({
  id: 'userState',
  state: (): UserState => ({
    userInfo: null,
    powerInfo: null,
    token: undefined,
    companyCode: undefined,
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getCompanyCode(): string {
      return this.companyCode || getAuthCache<string>(COMPANY_KEY);
    },
    getPowerInfo(): PowerInfo {
      return this.powerInfo || getAuthCache<PowerInfo>(POWER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setUserInfo(info: Nullable<UserInfo>) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setPowerInfo(info: Nullable<PowerInfo>) {
      this.powerInfo = info;
      setAuthCache(POWER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    setCompanyCode(companyCode: string | undefined) {
      this.companyCode = companyCode ? companyCode : DEFAULT_COMPANY_CODE;
      setAuthCache(COMPANY_KEY, companyCode);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.powerInfo = null;
      this.sessionTimeout = false;
      this.companyCode = '';
    },
    // 用户登陆
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<PowerInfo | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        // save userInfo
        this.setUserInfo(data);
        return this.afterLoginAction(loginParams.companyCode, goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 登陆后操作
    async afterLoginAction(companyCode: string, goHome?: boolean): Promise<PowerInfo | null> {
      if (!this.getToken) return null;
      this.setCompanyCode(companyCode);
      const powerInfo = await this.getPowerInfoAction();

      const sessionTimeout = this.sessionTimeout;

      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = useAppPermissionStoreWithOut();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(PageEnum.BASE_HOME));
      }
      return powerInfo;
    },
    async getPowerInfoAction(): Promise<PowerInfo | null> {
      if (!this.getToken) return null;
      const roleCode = this.getUserInfo.roleCode;
      const powerInfo = await getUserPowerInfo(roleCode);
      this.setPowerInfo(powerInfo);
      return powerInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo(this.getToken);
      this.setUserInfo(userInfo);
      return userInfo;
    },
    async updateToken() {
      const userInfo = this.getUserInfo;
      const res = await updateToken({ userId: userInfo.userId });
      this.setToken(res.token);
    },
    logout(goLogin = false) {
      const tabStore = useAppTabWithOutStore();
      const appStore = useAppStoreWithOut();
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      this.setPowerInfo(null);
      this.setCompanyCode(undefined);
      tabStore.resetState();
      appStore.setProjectConfig({
        menuSetting: {
          activeMenu: '',
          subActiveMenu: '',
        },
      });
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useAppUserStore(store);
}
