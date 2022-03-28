import { fmsHttp } from '@/utils/http/index';
import { LoginParams, PowerInfo } from '@/API/sys/model/userModel';
import { ErrorMessageMode } from '#/axios';
import { UserInfo } from '#/store';

enum Api {
  Login = '/login',
  GetUserPowerInfo = '/getPowerInfo',
  GetUserInfo = '/getUserInfo',
  UpdateToken = '/login/token',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'message') {
  return fmsHttp.post<UserInfo>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserPowerInfo
 */
export function getUserPowerInfo(roleCode: string) {
  return fmsHttp.get<PowerInfo>(
    { url: Api.GetUserPowerInfo, params: { roleCode } },
    { errorMessageMode: 'message' },
  );
}

// token获取用户信息
export function getUserInfo(token: string) {
  return fmsHttp.get<UserInfo>({ url: Api.GetUserInfo, params: { token } });
}

export function updateToken(params: { userId: number }) {
  return fmsHttp.get<{ token: string }>({ url: Api.UpdateToken, params });
}
