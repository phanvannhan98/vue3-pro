import { createI18n } from 'vue-i18n';

import en from './en';
import vi from './vi';

const messages = {
  en,
  vi,
};

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'en',
  fallbackLocale: 'vi',
  messages,
});

const t = i18n.global.t;

export { i18n, t };
