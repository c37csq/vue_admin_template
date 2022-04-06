import { resultPageSuccess } from '../_utils';
import { MockMethod } from 'vite-plugin-mock';
import { RoleFormType, RoleListItem } from '@/API/systemSetting/model/roleModel';

export function createRoleList(params: RoleFormType) {
  const list: RoleListItem[] = [
    {
      roleId: 1,
      roleCode: 'R001',
      roleName: '超级管理员',
      roleRemark: '超级管理员',
      useStatus: 0,
      createTime: '2020/03/23 11:13',
      updateTime: '2020/04/13 09:44',
      showPower: 0,
    },
    {
      roleId: 2,
      roleCode: 'R002',
      roleName: '海外客服',
      roleRemark: '海外客服',
      useStatus: 0,
      createTime: '2020/03/23 14:14',
      updateTime: '2021/12/31 13:59',
      showPower: 1,
    },
    {
      roleId: 3,
      roleCode: 'R003',
      roleName: '销售',
      roleRemark: '销售',
      useStatus: 0,
      createTime: '2020/03/23 10:40',
      updateTime: '2021/12/31 13:59',
      showPower: 1,
    },
    {
      roleId: 4,
      roleCode: 'R004',
      roleName: '海外客服经理',
      roleRemark: '海外客服经理',
      useStatus: 0,
      createTime: '2020/03/23 17:13',
      updateTime: '2021/12/31 14:00',
      showPower: 0,
    },
    {
      roleId: 5,
      roleCode: 'R005',
      roleName: '销售经理',
      roleRemark: '销售经理',
      useStatus: 0,
      createTime: '2020/03/23 17:19',
      updateTime: '2020/04/13 09:44',
      showPower: 0,
    },
    {
      roleId: 6,
      roleCode: 'R006',
      roleName: '财务经理',
      roleRemark: '财务经理',
      useStatus: 0,
      createTime: '2020/03/23 15:27',
      updateTime: '2020/04/13 09:45',
      showPower: 0,
    },
    {
      roleId: 7,
      roleCode: 'R007',
      roleName: '出纳',
      roleRemark: '出纳',
      useStatus: 0,
      createTime: '2020/03/23 15:27',
      updateTime: '2020/04/13 09:45',
      showPower: 0,
    },
    {
      roleId: 8,
      roleCode: 'R008',
      roleName: '会计',
      roleRemark: '会计',
      useStatus: 0,
      createTime: '2020/03/23 15:28',
      updateTime: '2020/04/13 09:45',
      showPower: 0,
    },
    {
      roleId: 11,
      roleCode: 'R009',
      roleName: '董事长',
      roleRemark: '董事长',
      useStatus: 0,
      createTime: '2020/03/24 14:40',
      updateTime: '2020/04/13 09:45',
      showPower: 0,
    },
    {
      roleId: 12,
      roleCode: 'R010',
      roleName: '常务副总经理',
      roleRemark: '常务副总经理',
      useStatus: 0,
      createTime: '2020/03/24 14:40',
      updateTime: '2021/12/31 12:47',
      showPower: 0,
    },
    {
      roleId: 13,
      roleCode: 'R011',
      roleName: '海外部经理',
      roleRemark: '海外部经理',
      useStatus: 0,
      createTime: '2020/03/24 15:54',
      updateTime: '2021/12/31 12:49',
      showPower: 0,
    },
    {
      roleId: 14,
      roleCode: 'R012',
      roleName: '货代客服',
      roleRemark: '货代客服',
      useStatus: 0,
      createTime: '2020/03/24 16:02',
      updateTime: '2021/12/31 11:37',
      showPower: 1,
    },
    {
      roleId: 15,
      roleCode: 'R013',
      roleName: '货代客服经理',
      roleRemark: '货代客服经理',
      useStatus: 0,
      createTime: '2020/03/24 16:02',
      updateTime: '2021/12/31 11:36',
      showPower: 0,
    },
    {
      roleId: 18,
      roleCode: 'R016',
      roleName: '产品风控',
      roleRemark: '产品风控',
      useStatus: 0,
      createTime: '2021/03/19 09:16',
      updateTime: '2022/01/04 09:32',
      showPower: 0,
    },
    {
      roleId: 19,
      roleCode: 'R019',
      roleName: '人事',
      roleRemark: '人事',
      useStatus: 0,
      createTime: '2021/04/30 12:35',
      updateTime: '2021/12/31 13:32',
      showPower: 1,
    },
    {
      roleId: 20,
      roleCode: 'R020',
      roleName: '市场经理',
      roleRemark: '市场经理',
      useStatus: 0,
      createTime: '2021/07/01 11:23',
      updateTime: '2021/07/01 11:23',
      showPower: 1,
    },
  ];
  const { roleCode, roleName, useStatus } = params;
  const resultList = list.filter(
    (item) =>
      (roleName ? item.roleName.includes(roleName) : true) &&
      (roleCode ? item.roleCode === roleCode : true) &&
      item.useStatus == useStatus,
  );
  return resultList;
}

export default [
  {
    url: '/basic-api/getRoleList',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const { pageSize, pageNum, roleCode, roleName, useStatus } = query;
      const list = createRoleList({
        roleCode,
        roleName,
        useStatus,
      });
      return resultPageSuccess(Number(pageNum), Number(pageSize), list);
    },
  },
] as MockMethod[];
