import { fmsHttp } from '@/utils/http/index';
import { ResponseListType } from '@/API/common/model/responseModel';
import { ErrorMessageMode } from '#/axios';
import {
  OperateUserRequestParams,
  RequestUserListParams,
  UserListItem,
} from '@/API/systemSetting/model/userModel';

enum Api {
  List = '/user/info/list',
  OperateUser = '/user/info',
}

export function getUserList(params: RequestUserListParams, mode: ErrorMessageMode = 'message') {
  return fmsHttp.get<ResponseListType<UserListItem[]>>(
    {
      url: Api.List,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addUser(params: OperateUserRequestParams) {
  return fmsHttp.post({ url: Api.OperateUser, data: params });
}

export function editUser(params: OperateUserRequestParams) {
  return fmsHttp.put({ url: Api.OperateUser, data: params });
}
