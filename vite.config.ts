import { resolve } from 'path';
import { loadEnv, UserConfig, ConfigEnv } from 'vite';

import { createVitePlugins } from './config/vite/plugin';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isBuild = command === 'build';

  return {
    base: '/tms/',
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        { find: /@\//, replacement: resolve(process.cwd(), '.', 'src') + '/' },
      ],
    },

    // plugins
    plugins: createVitePlugins(isBuild),

    server: {
      // Disable or configure HMR connections Set server.hmr.overlay to false to disable the server error masking layer
      hmr: { overlay: false },
      // Service configuration
      // Type: number specifies the server port;
      port: parseInt(process.env.VITE_PORT!),
      // Type: boolean | string Automatically open the application in the browser when the server starts;
      open: false,
      // Type: boolean | CorsOptions Configure CORS for the development server. Enabled by default and allows any origin
      cors: {
        origin: 'http://localhost:8088',
        credentials: true,
        preflightContinue: false,
      },
      // IP configuration, support boot from IP
      host: '0.0.0.0',
    },

    build: {
      outDir: 'target/dist/tms',
      assetsDir: 'static',
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: false,
        },
      },
      chunkSizeWarningLimit: 2000,
      sourcemap: true,
    },
  };
};
