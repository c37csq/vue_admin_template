import type { App } from 'vue';
import SvgIcon from './Icon';
import { PageWrapper } from './Page';
import { Button } from './Button';
import { Pagination } from './Pagination';
import { Dialog } from './Dialog';

export function registerGlobComp(app: App) {
  app.component('SvgIcon', SvgIcon);
  app.component('PageWrapper', PageWrapper);
  app.component('Pagination', Pagination);
  app.component('Button', Button);
  app.component('Dialog', Dialog);
}
