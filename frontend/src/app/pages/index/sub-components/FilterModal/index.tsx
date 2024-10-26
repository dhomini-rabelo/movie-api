import { zodResolver } from '@hookform/resolvers/zod'
import { FilterSchema, FilterSchemaType } from './schema'
import { useForm } from 'react-hook-form'
import { useFeedback } from '../../../../hooks/useFeedback'
import { client, queryClient } from '../../../../../code/settings'
import { processFormErrorResponse } from '../../../../../code/process-error'
import { AxiosError } from 'axios'
import { SimpleModal } from '../../../../components/forms/modals/SimpleModal'
import { Input } from '../../../../components/forms/Input'
import { useQuery } from '@tanstack/react-query'
import {
  ActorEntity,
  DirectorEntity,
  GenreEntity,
} from '../../../../../code/entities'
import { Button } from '../../../../components/forms/Button'
import { Select } from '../../../../components/forms/Select'
import { Funnel } from 'phosphor-react'

type FilterModalProps = {
  onClose: () => void
  setActiveFilter: (value: boolean) => void
}

export function FilterModal({ onClose, setActiveFilter }: FilterModalProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setError,
  } = useForm<FilterSchemaType>({
    resolver: zodResolver(FilterSchema),
  })
  const { FeedbackElement, renderFeedback } = useFeedback()
  const { data: components } = useQuery<{
    actors: ActorEntity[]
    directors: DirectorEntity[]
    genres: GenreEntity[]
  }>({
    queryKey: ['movie-components'],
    queryFn: async () => {
      return client.get('/movie-app/movie/components').then((res) => res.data)
    },
  })

  async function onValidSubmit(data: FilterSchemaType) {
    try {
      setActiveFilter(
        data.name !== '' ||
          data.actorId !== '' ||
          data.directorId !== '' ||
          data.genreId !== '',
      )
      const response = await client({
        method: 'POST',
        url: 'movie-app/movie/list',
        data: {
          name: data.name,
          actorId: data.actorId || undefined,
          genreId: data.genreId || undefined,
          directorId: data.directorId || undefined,
        },
      })
      renderFeedback('success', {
        message: 'Successfully!',
        onClose: () => {
          queryClient.setQueryData(['movies'], response.data)
          onClose()
        },
      })
    } catch (error) {
      processFormErrorResponse<FilterSchemaType>(
        error as AxiosError,
        data,
        setError,
        reset,
        renderFeedback,
      )
    }
  }

  function clearForm() {
    reset()
  }

  return (
    <>
      {FeedbackElement}
      <SimpleModal title="Filter Movies" onClose={onClose}>
        <form
          className="mt-8 flex flex-col gap-y-3"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          {components && (
            <>
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
                <Input.Label>Genre:</Input.Label>
                <Select
                  {...register('genreId')}
                  className="w-full"
                  options={components.genres.map((genre) => ({
                    value: genre.id,
                    display: genre.name,
                  }))}
                />
                <Input.Message>{errors.genreId?.message}</Input.Message>
              </Input.Root>
              <div className="flex w-full justify-between gap-x-4">
                <div className="w-full">
                  <Input.Root>
                    <Input.Label>Actor:</Input.Label>
                    <Select
                      {...register('actorId')}
                      className="w-full"
                      options={components.actors.map((actor) => ({
                        value: actor.id,
                        display: actor.name,
                      }))}
                    />
                    <Input.Message>{errors.actorId?.message}</Input.Message>
                  </Input.Root>
                </div>
                <div className="w-full">
                  <Input.Root>
                    <Input.Label>Director:</Input.Label>
                    <Select
                      {...register('directorId')}
                      className="w-full"
                      options={components.directors.map((director) => ({
                        value: director.id,
                        display: director.name,
                      }))}
                    />
                    <Input.Message>{errors.directorId?.message}</Input.Message>
                  </Input.Root>
                </div>
              </div>
              <div className="mt-6 w-full">
                <div className="flex justify-end items-center gap-x-2">
                  <div>
                    <Button
                      isSubmitting={isSubmitting}
                      onClick={clearForm}
                      variant="error"
                      className="w-auto"
                      value="clear"
                    >
                      Clear
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      isSubmitting={isSubmitting}
                      className="w-auto"
                      value="submit"
                    >
                      <Funnel
                        size={20}
                        className="inline-block mr-1 relative -top-[0.5px]"
                      />
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      </SimpleModal>
    </>
  )
}
