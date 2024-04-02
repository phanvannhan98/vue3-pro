import { useDebounceFn } from '@vueuse/core';
/**
 * Global scrollable directive
 * @Example <div v-scrollable></div>
 */
import type { App, Directive, DirectiveBinding } from 'vue';

const mounted = (el: HTMLElement, _: DirectiveBinding) => {
  const scrollEl = document.createElement('div');

  let percent = 0;
  let limitTopStyle = 0;
  let originalElY = 0;
  let originalScrollTop = 0;

  const getTopStyle = () => el.scrollTop * (1 + percent);

  scrollEl.onmousedown = (e) => {
    originalElY = e.y;

    document.body.onmousemove = (ee) => {
      document.body.classList.add('select-none');
      el.scrollTop = originalScrollTop + (ee.y - originalElY) / percent;

      // const top = ee.y - originalElY;

      scrollEl.style.top = Math.max(0, Math.min(ee.y - originalElY, limitTopStyle)) + 'px';
    };

    document.body.onmouseup = (e) => {
      document.body.classList.remove('select-none');
      document.body.onmousemove = null;
      originalElY = 0;
      originalScrollTop = el.scrollTop;
      document.body.onmouseup = null;

      if (!el.contains(e.target as any)) {
        el.dispatchEvent(new Event('mouseleave'));
      }
    };
  };

  scrollEl.onmouseup = () => {
    document.body.onmousemove = null;
    originalElY = 0;
    el.dispatchEvent(new Event('onmouseleave'));
  };

  el.onmouseenter = () => {
    percent = el.clientHeight / el.scrollHeight;

    if (percent === 1) return;

    if (document.body.onmousemove) {
      el.onmouseup = () => {
        document.body.onmousemove = null;
        el.dispatchEvent(new Event('mouseenter'));
      };

      return;
    }

    limitTopStyle = el.scrollHeight - percent * el.clientHeight;

    console.log(limitTopStyle);

    scrollEl.className = 'scrollable';
    scrollEl.style.height = percent * el.clientHeight + 'px';
    scrollEl.style.top = getTopStyle() + 'px';

    el.appendChild(scrollEl);
  };

  const debounceScrollTop = useDebounceFn(() => {
    originalScrollTop = el.scrollTop;
    el.onmouseup = null;
  }, 300);

  el.onscroll = () => {
    scrollEl.style.top = getTopStyle() + 'px';

    debounceScrollTop();
  };

  el.onmouseleave = () => {
    if (originalElY === 0) scrollEl.remove();
  };

  el.classList.add('overflow-auto', 'relative');
};

const scrollAbleDirective: Directive = {
  mounted,
};

export function setupScrollAbleDirective(app: App) {
  app.directive('scrollable', scrollAbleDirective);
}

export default scrollAbleDirective;
