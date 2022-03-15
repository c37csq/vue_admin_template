/*
 * @Author: c37csq
 * @Date: 2021-12-Fr 09:42:35
 * @Last Modified by:   c37csq
 * @Last Modified time: 2021-12-Fr 09:42:35
 */

import { isObject } from '@/utils/checkType';
import { unref } from 'vue';

export function deepMerge(src: any = {}, target: any = {}) {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function formResetFields(formRef) {
  return unref(formRef)?.resetFields();
}

export function formValidate(formRef) {
  return new Promise((resolve) => {
    unref(formRef)?.validate((isValid: boolean) => {
      if (!isValid) return;
      resolve(true);
    });
  });
}

export function dateFormat(val: string | undefined, symbol = '/'): string | undefined {
  if (val) {
    const date = new Date(val);
    return (
      date.getFullYear() +
      symbol +
      (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
      symbol +
      date.getDate()
    );
  }
}
