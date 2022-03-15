import { genMessage } from '../helper';
import elementPlusLocale from 'element-plus/lib/locale/lang/en';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    elementPlusLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
