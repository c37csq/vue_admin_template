/*
 * @Author: c37csq
 * @Date: 2021-12-Fr 09:41:38
 * @Last Modified by:   c37csq
 * @Last Modified time: 2021-12-Fr 09:41:38
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
