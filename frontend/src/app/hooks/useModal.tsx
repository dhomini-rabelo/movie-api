import { useState } from 'react'

export function useModals<ModalsOption>(
  initialActiveModalValue: ModalsOption | null = null,
) {
  const [activeModal, setActiveModal] = useState<ModalsOption | null>(
    initialActiveModalValue,
  )
  return {
    currentActiveModal: activeModal,
    activateModal: (modalName: ModalsOption) => setActiveModal(modalName),
    disableModal: () => {
      if (activeModal !== null) {
        setActiveModal(null)
      }
    },
  }
}
