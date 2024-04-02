import { mittInstance } from '@/utils/mitt';

export function useLoading() {
  const isLoading = ref(false);

  const setIsLoading = (_isLoading: boolean) => {
    isLoading.value = _isLoading;
  };

  provide('setIsLoading', setIsLoading);
  mittInstance.on('setIsLoading', setIsLoading);

  return { isLoading };
}
