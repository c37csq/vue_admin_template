import { loadEnv } from 'vite';
import { resolve } from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constant';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default (({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';
  return {
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
    },
    base: VITE_PUBLIC_PATH, // 打包路径
    root,
    server: {
      host: true,
      port: VITE_PORT, // 服务端口号
      proxy: createProxy(VITE_PROXY),
      // proxy: {
      //   '/api': {
      //     target: env.VITE_BASE_URL,
      //     changeOrigin: __DEV__,
      //   },
      // },
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
});
