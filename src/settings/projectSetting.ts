// ! You need to clear the browser cache after the change
import { ProjectConfig } from '#/config';

const setting: ProjectConfig = {
  // 0 session 1 local
  cacheType: 1,
  // Menu configuration
  menuSetting: {
    collapsed: false,
    activeMenu: '',
    subActiveMenu: '',
  },
  // Multi-label
  multiTabsSetting: {
    cache: true,
    show: true,
    canDrag: true,
  },
  // Transition Setting
  transitionSetting: {
    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: true,
  },
  openKeepAlive: true,
  removeAllHttpPending: true,
  closeMessageOnSwitch: true,
};

export default setting;
