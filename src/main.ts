import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import '@/styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { initAppConfigStore } from '@/logics/initAppConfig';
import { registerGlobComp } from '@/components/registerGlobComp';
import { setupI18n } from '@/locales/setupI18n';

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  registerGlobComp(app);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  app.mount('#app');
}
bootstrap();
