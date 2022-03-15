import WindiCSS from 'vite-plugin-windicss';
import { configHmrPlugin } from './hmr';
import legacy from '@vitejs/plugin-legacy';
import { configHtmlPlugin } from './html';
import vue from '@vitejs/plugin-vue';
import type { Plugin } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configImageminPlugin } from './imagemin';
import { configCompressPlugin } from './compress';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { configSvgIconsPlugin } from './svgSprite';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      // 配置文件路径
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      directoryAsNamespace: true
    }),
    // have to
    vueJsx(),
    // support name
    vueSetupExtend(),
  ];

  // vite-plugin-windicss
  vitePlugins.push(WindiCSS());

  // TODO
  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );

  }

  return vitePlugins;
}