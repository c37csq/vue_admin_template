import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export function createCountInfo() {
  return [
    {
      totalNumber: 3371,
      deliveryTimeout: 80,
      checkTimeout: 2,
      costEntryTimeout: 197,
      costTakeTimeout: 1129,
      shipmentTimeout: 1963,
      productDataSize: 0,
      businessGroupCode: 'B007',
    },
  ];
}

export function createChartData(type: '1' | '2') {
  switch (type) {
    case '1':
      return [
        {
          statisticData: '2022/03/14',
          statisticCount: 1,
        },
        {
          statisticData: '2022/03/15',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/16',
          statisticCount: 1,
        },
        {
          statisticData: '2022/03/17',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/18',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/19',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/20',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/21',
          statisticCount: 1,
        },
        {
          statisticData: '2022/03/22',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/23',
          statisticCount: 3,
        },
        {
          statisticData: '2022/03/24',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/25',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/26',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/27',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/28',
          statisticCount: 0,
        },
      ];
      break;
    case '2':
      return [
        {
          statisticData: '2022/03/22',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/23',
          statisticCount: 3,
        },
        {
          statisticData: '2022/03/24',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/25',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/26',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/27',
          statisticCount: 0,
        },
        {
          statisticData: '2022/03/28',
          statisticCount: 0,
        },
      ];
      break;
  }
}

export default [
  // mock user login
  {
    url: '/basic-api/getCountInfo',
    method: 'get',
    response: () => {
      return resultSuccess(createCountInfo());
    },
  },
  {
    url: '/basic-api/getChartData',
    method: 'get',
    response: ({ query }) => {
      const { statisticsType } = query;
      return resultSuccess(createChartData(statisticsType));
    },
  },
] as MockMethod[];
