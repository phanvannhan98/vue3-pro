import { useTitle as usePageTitle } from '@vueuse/core';

export function useTitle() {
  const { t } = useI18n();
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();

  watchEffect(() => {
    const title = (currentRoute.value?.meta?.title || 'appTitle') as string;

    pageTitle.value = t(title);
  });
}
