/**
 * @name AutoImportDeps
 * @description Load on demand, automatically introduce dependencies
 */
import AutoImport from 'unplugin-auto-import/vite';

export const AutoImportDeps = () =>
  AutoImport({
    imports: ['vue', 'vue-router', 'vue-i18n'],
    dts: 'src/auto-imports.d.ts',
  });
