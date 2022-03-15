import { CacheTypeEnum, COMPANY_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { BasicKeys, Persistent } from '@/utils/cache/persistent';
import projectSetting from '@/settings/projectSetting';
import { UserInfo } from '#/store';

const isLocal = projectSetting.cacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getCompanyCode() {
  return getAuthCache(COMPANY_KEY);
}

export function getUserInfo(): UserInfo {
  return getAuthCache(USER_INFO_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
