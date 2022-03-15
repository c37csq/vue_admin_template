import { genMessage } from '../helper';
import elementPlusLocale from 'element-plus/lib/locale/lang/zh-cn';

const modules = import.meta.globEager('./zh-CN/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    elementPlusLocale,
  },
};
