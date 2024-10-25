import { Input } from '../../../../forms/Input'
import { Button } from '../../../../forms/Button'
import { SimpleModal } from '../../../../forms/modals/SimpleModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FolderSchema, FolderSchemaType } from './schema'
import { processFormErrorResponse } from '../../../../../../code/process-error'
import { AxiosError } from 'axios'
import { useFeedback } from '../../../../../hooks/useFeedback'
import { client, queryClient } from '../../../../../../code/settings'
import { FolderEntity } from '../../../../../../code/entities'

type FolderModalProps = {
  onClose: () => void
  editData?: FolderEntity
}

export function FolderModal({ onClose, editData }: FolderModalProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setError,
  } = useForm<FolderSchemaType>({
    resolver: zodResolver(FolderSchema),
    defaultValues: {
      name: editData?.name || '',
      description: editData?.description || '',
    },
  })
  const { FeedbackElement, renderFeedback } = useFeedback()

  async function onValidSubmit(data: FolderSchemaType) {
    try {
      await client({
        method: editData ? 'put' : 'post',
        url: `/folders${editData ? `/${editData.id}` : ''}`,
        data: {
          name: data.name,
          description: data.description,
        },
      })
      renderFeedback('success', {
        message: 'Successfully!',
        onClose: () => {
          queryClient.invalidateQueries({
            queryKey: ['my-folders'],
          })
          onClose()
        },
      })
    } catch (error) {
      processFormErrorResponse<FolderSchemaType>(
        error as AxiosError,
        data,
        setError,
        reset,
        renderFeedback,
      )
    }
  }

  return (
    <>
      {FeedbackElement}
      <SimpleModal
        title={editData ? 'Edit folder' : 'Add folder'}
        onClose={onClose}
      >
        <form
          className="mt-8 flex flex-col gap-y-3"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <Input.Root>
            <Input.Label>Name:</Input.Label>
            <Input.Box
              type="text"
              placeholder="Type folder name"
              {...register('name')}
            />
            <Input.Message>{errors.name?.message}</Input.Message>
          </Input.Root>
          <Input.Root>
            <Input.Label>Description:</Input.Label>
            <Input.Box
              type="text-area"
              placeholder="Type folder description"
              {...register('description')}
            />
            <Input.Message>{errors.description?.message}</Input.Message>
          </Input.Root>
          <div className="mt-6 w-full">
            <Button type="submit" isSubmitting={isSubmitting}>
              Save
            </Button>
          </div>
        </form>
      </SimpleModal>
    </>
  )
}
