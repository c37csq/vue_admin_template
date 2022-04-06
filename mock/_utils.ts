// Interface data format used to return a unified format

export function resultSuccess<T = Recordable>(data: T) {
  return {
    code: 1,
    data,
    message: 'SUCCESS',
  };
}

export function resultPageSuccess<T = any>(pageNum: number, pageSize: number, list: T[]) {
  const pageData = pagination(pageNum, pageSize, list);

  return resultSuccess(pageData);
}

export function resultError(message = 'Request failed', { code = 1 } = {}) {
  return {
    code,
    message,
  };
}

export function pagination<T = any>(pageNum: number, pageSize: number, array: T[]) {
  const offset = (pageNum - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return {
    list: ret,
    pageNum,
    pageSize,
    total: array.length,
  };
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
