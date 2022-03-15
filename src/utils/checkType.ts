// 判断类型方法
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

// 判断是否对象
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

// 判断函数
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

// 是否是字符串
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

// check number more than zero
export function checkNumber(val: string) {
  const reg = /(^[1-9]\d*$)/;
  if (reg.test(val)) {
    return true;
  }
  return false;
}
