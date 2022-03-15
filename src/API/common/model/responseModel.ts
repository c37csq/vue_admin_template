import { PageParams } from '@/API/common/model/requestModel';

export interface ResponseType<T> {
  code: number;
  data: T;
  message: string;
}

export type ResponseListType<T> = {
  list: T;
  total: number;
} & PageParams;
