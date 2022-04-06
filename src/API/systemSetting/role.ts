import { fmsHttp } from '@/utils/http/index';
import {
  OperateRoleRequestParams,
  RequestRoleListParams,
  RoleListItem,
} from '@/API/systemSetting/model/roleModel';
import { ResponseListType } from '@/API/common/model/responseModel';
import { ErrorMessageMode } from '#/axios';

enum Api {
  List = '/getRoleList',
  OperateRole = '/role/info',
}

export function getRoleList(params: RequestRoleListParams, mode: ErrorMessageMode = 'message') {
  return fmsHttp.get<ResponseListType<RoleListItem[]>>(
    {
      url: Api.List,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addRole(params: OperateRoleRequestParams) {
  return fmsHttp.post({ url: Api.OperateRole, data: params });
}

export function editRole(params: OperateRoleRequestParams) {
  return fmsHttp.put({ url: Api.OperateRole, data: params });
}

export function setRoleStatus(params: OperateRoleRequestParams) {
  return fmsHttp.put({ url: Api.OperateRole, data: params });
}
