import { watchEffect, ref, computed } from 'vue';
enum LanguageEnum {
  VI = 'VI',
  EN = 'EN',
}

const languageKey = 'x-language';

export function getLanguage() {
  return localStorage.getItem(languageKey) || 'EN';
}

export function setLanguage(language: 'VI' | 'EN') {
  localStorage.setItem(languageKey, language);
}

export function removeLanguage() {
  localStorage.setItem(languageKey, '');
}

export function useLanguage() {
  const { locale } = useI18n({ useScope: 'global' });

  const isVieLang = ref(getLanguage() === LanguageEnum.VI);
  const currentLanguage = computed(() => (isVieLang.value ? LanguageEnum.VI : LanguageEnum.EN));

  watchEffect(() => {
    setLanguage(currentLanguage.value);
    locale.value = currentLanguage.value.toLowerCase();
  });

  return { isVieLang, LanguageEnum };
}
