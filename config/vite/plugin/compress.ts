/**
 * Used to package and output gzip.
 * https://github.com/anncwb/vite-plugin-compression
 */

import type { Plugin } from 'vite';
import compressPlugin from 'vite-plugin-compression';

export function configCompressPlugin(): Plugin | Plugin[] {
  return compressPlugin({
    ext: '.gz',
    deleteOriginFile: false,
  }) as Plugin;
}
