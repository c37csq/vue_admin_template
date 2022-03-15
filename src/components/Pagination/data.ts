import { reactive } from 'vue';

export type PaginationParams = {
  pageNum: number;
  pageSize: number;
};

export type PageParams = {
  pageNum: number;
  pageSize: number;
  total: number;
};

export const initPageData = () => {
  return reactive<PageParams>({
    pageNum: 1,
    pageSize: 8,
    total: 0,
  });
};

export const DEFAULT_PAGE_SIZE = 8;
