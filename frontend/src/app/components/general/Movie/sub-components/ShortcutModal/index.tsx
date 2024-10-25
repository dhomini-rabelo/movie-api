import { Input } from '../../../../forms/Input'
import { Button } from '../../../../forms/Button'
import { SimpleModal } from '../../../../forms/modals/SimpleModal'
import { CheckCircle, CopySimple } from 'phosphor-react'
import { ShortcutEntity } from '../../../../../../code/entities'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ShortcutSchema, ShortcutSchemaType } from './schema'
import { useFeedback } from '../../../../../hooks/useFeedback'
import { client, queryClient } from '../../../../../../code/settings'
import { processFormErrorResponse } from '../../../../../../code/process-error'
import { AxiosError } from 'axios'
import copy from 'copy-to-clipboard'

export type ShortcutModalProps = {
  onClose: () => void
  shortcutData: ShortcutEntity | { folder: number; text?: string; id?: number }
  mode: 'edit' | 'create' | 'read'
}

export function ShortcutModal({
  shortcutData,
  mode,
  onClose,
}: ShortcutModalProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setError,
    getValues,
  } = useForm<ShortcutSchemaType>({
    resolver: zodResolver(ShortcutSchema),
    defaultValues: {
      text: shortcutData?.text || '',
    },
  })
  const { FeedbackElement, renderFeedback } = useFeedback()

  async function onValidSubmit(data: ShortcutSchemaType) {
    try {
      await client({
        method: mode === 'edit' ? 'put' : 'post',
        url: `/shortcuts${mode === 'edit' && shortcutData ? `/${shortcutData.id}` : ''}`,
        data: {
          text: data.text,
          folder: shortcutData.folder,
        },
      })
      renderFeedback('success', {
        message: 'Successfully!',
        onClose: () => {
          queryClient.invalidateQueries({
            queryKey: ['shortcuts-from-folder'],
          })
          onClose()
        },
      })
    } catch (error) {
      processFormErrorResponse<ShortcutSchemaType>(
        error as AxiosError,
        data,
        setError,
        reset,
        renderFeedback,
      )
    }
  }

  function copyTextToClipboard() {
    const data = getValues()
    copy(data.text)
    renderFeedback('success', {
      message: 'Copied!',
    })
  }

  return (
    <>
      {FeedbackElement}
      <SimpleModal
        title={
          {
            edit: 'Edit Shortcut',
            create: 'Create Shortcut',
            read: 'Copy Shortcut',
          }[mode]
        }
        onClose={onClose}
      >
        <form
          className="mt-8 flex flex-col gap-y-3"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <Input.Root>
            <Input.Label>Shortcut:</Input.Label>
            <Input.Box
              type="text-area"
              placeholder="Type your description"
              {...register('text')}
            />
            <Input.Message>{errors.text?.message}</Input.Message>
          </Input.Root>
          <footer className="mt-2 flex items-center justify-end w-full">
            <div className="flex gap-x-2">
              {mode !== 'read' && (
                <div className="w-auto">
                  <Button type="submit" size="sm" isSubmitting={isSubmitting}>
                    <span className="flex items-center">
                      <CheckCircle
                        size={24}
                        weight="fill"
                        className="inline-block mr-1"
                      />
                      Save
                    </span>
                  </Button>
                </div>
              )}
              <div className="w-auto">
                <Button size="sm" onClick={copyTextToClipboard}>
                  <span className="flex items-center">
                    <CopySimple
                      size={24}
                      weight="fill"
                      className="inline-block mr-1"
                    />
                    Copy
                  </span>
                </Button>
              </div>
            </div>
          </footer>
        </form>
      </SimpleModal>
    </>
  )
}
