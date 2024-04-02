import { mittInstance } from '@/utils/mitt';

export function useConfirmModal() {
  const initModalConfig = {
    title: '',
    subTitle: '',
    icon: 'arrow-down',
    onOK: () => {},
    onCancel: () => {},
  } as Required<TConfirmConfig>;

  const confirmModalVisible = ref(false);
  const confirmModalConfig = ref({ ...initModalConfig });

  const showConfirmModal = (confirmConfig: TConfirmConfig) => {
    confirmModalVisible.value = true;

    confirmModalConfig.value = { ...initModalConfig };
    Object.keys(confirmConfig).map((key) => (confirmModalConfig.value[key] = confirmConfig[key]));
  };

  provide('showConfirmModal', showConfirmModal);
  mittInstance.on('showConfirmModal', showConfirmModal);

  return { confirmModalVisible, confirmModalConfig };
}
