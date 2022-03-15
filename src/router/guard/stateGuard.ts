import type { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { useUserStoreWithOut } from '@/store/modules/user';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const userStore = useUserStoreWithOut();
      userStore.resetState();
    }
  });
}
