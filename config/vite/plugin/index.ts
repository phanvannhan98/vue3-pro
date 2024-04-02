import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import type { Plugin } from 'vite';
import svgLoader from 'vite-svg-loader';

import { AutoImportDeps } from './autoImport';
import { autoRegistryComponents } from './component';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    svgLoader({
      svgoConfig: {
        plugins: [{ name: 'convertStyleToAttrs' }, { name: 'removeDimensions' }],
      },
    }),
    vueI18n({ include: resolve(__dirname, './src/i18n/**'), runtimeOnly: false }),
    // Automatically import components on demand
    autoRegistryComponents(),
    // Automatically import dependencies as needed
    AutoImportDeps(),
  ];

  // rollup-plugin-gzip
  isBuild && vitePlugins.push(configCompressPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  return vitePlugins;
}
