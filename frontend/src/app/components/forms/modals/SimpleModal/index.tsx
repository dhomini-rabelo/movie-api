import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState } from 'react'
import { Text } from '../../../common/Text'
import { X } from 'phosphor-react'

type SimpleModalProps = {
  title?: string
  children: React.ReactNode
  onClose?: () => void
}

export function SimpleModal({ children, title, onClose }: SimpleModalProps) {
  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
    onClose && onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/55 p-4 transition duration-300 ease-out data-[closed]:opacity-95"
    >
      <DialogPanel className="w-full max-w-[32rem] space-y-4 bg-Black-300 px-4 py-5 rounded-2xl">
        <DialogTitle className="font-bold flex items-center justify-between">
          <Text size="lg">{title}</Text>
          <X
            size={24}
            className="cursor-pointer"
            weight="bold"
            color="white"
            onClick={closeModal}
          />
        </DialogTitle>
        {children}
      </DialogPanel>
    </Dialog>
  )
}
