import { X, CheckCircle } from 'phosphor-react'
import { IDefaultModalProps } from './types'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { Text } from '../../../components/common/Text'
import { Button } from '../../../components/forms/Button'

export function SuccessModal({
  title = '',
  message,
  onClose,
}: IDefaultModalProps) {
  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
    onClose && onClose()
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/55 p-4 transition duration-300 ease-out data-[closed]:opacity-95"
      >
        <DialogPanel className="w-full max-w-[28rem] space-y-4 bg-Black-300 px-4 py-5 rounded-2xl">
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
          <div className="py-2 w-full flex flex-col items-center justify-center">
            <CheckCircle size={92} weight="fill" className="text-Green-300" />
            <span className="text-white text-lg text-center block mt-2">
              {message}
            </span>
          </div>
          <div>
            <Button onClick={closeModal}>FECHAR</Button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
