/**
 * Global color directive
 * @Example v-click-outside="callback"
 * @Example v-click-outside:ignoreIdElement="callback"
 */

import { isFunction } from 'lodash-es';
import type { App, Directive, DirectiveBinding } from 'vue';

type CustomHTMLElement = HTMLElement & { cleanup: Fn };

const mounted = (el: CustomHTMLElement, { value, arg }: DirectiveBinding) => {
  if (!isFunction(value)) return;

  const clickOutside = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;

    if (arg) {
      const ignoreElement = document.getElementById(arg);

      if (ignoreElement && ignoreElement.contains(targetElement)) return;
    }

    if (!el.contains(targetElement)) value();
  };

  window.addEventListener('mousedown', clickOutside);
  el.cleanup = () => {
    window.removeEventListener('mousedown', clickOutside);
  };
};

const clickOutsideDirective: Directive = {
  mounted,
  unmounted(el: CustomHTMLElement) {
    el.cleanup();
  },
};

export function setupClickOutsideDirective(app: App) {
  app.directive('click-outside', clickOutsideDirective);
}

export default clickOutsideDirective;
