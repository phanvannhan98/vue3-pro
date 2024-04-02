/**
 * Configure and register global directives
 */
import type { App } from 'vue';

import { setupClickOutsideDirective } from './click-outside';

export function setupGlobDirectives(app: App) {
  setupClickOutsideDirective(app);
}
