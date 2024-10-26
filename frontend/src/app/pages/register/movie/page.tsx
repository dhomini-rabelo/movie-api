import { useForm } from 'react-hook-form'
import { Button } from '../../../components/forms/Button'
import { Input } from '../../../components/forms/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { client } from '../../../../code/settings'
import { useFeedback } from '../../../hooks/useFeedback'
import { Header } from '../../../components/utils/Header'
import { Text } from '../../../components/common/Text'
import { ErrorMessages } from '../../../utils/errors'
import * as zod from 'zod'
import { useQuery } from '@tanstack/react-query'
import { Select } from '../../../components/forms/Select'
import {
  ActorEntity,
  DirectorEntity,
  GenreEntity,
} from '../../../../code/entities'
import { FilmSlate } from 'phosphor-react'

export const MovieSchema = zod.object({
  name: zod.string().min(1, { message: ErrorMessages.REQUIRED }),
  description: zod.string().min(1, { message: ErrorMessages.REQUIRED }),
  poster: zod.string().min(1, { message: ErrorMessages.REQUIRED }).url(),
  actorId: zod.string().min(1, { message: ErrorMessages.REQUIRED }),
  directorId: zod.string().min(1, { message: ErrorMessages.REQUIRED }),
  genreId: zod.string().min(1, { message: ErrorMessages.REQUIRED }),
  year: zod.coerce.number().int().min(2000).max(2024),
  minutes: zod.coerce.number().int().min(20),
})

export type MovieSchemaType = zod.infer<typeof MovieSchema>

export function RegisterMoviePagePage() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<MovieSchemaType>({
    resolver: zodResolver(MovieSchema),
  })
  const { FeedbackElement, renderFeedback } = useFeedback()
  const navigate = useNavigate()
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

  async function onValidSubmit(data: MovieSchemaType) {
    try {
      const response = await client.post('/movie-app/movie/create', {
        name: data.name,
        description: data.description,
        poster: data.poster,
        year: data.year,
        totalMinutes: data.minutes,
        actorsId: [data.actorId],
        directorsId: [data.directorId],
        genresId: [data.genreId],
      })

      renderFeedback('success', {
        message: 'Movie registered!',
        onClose: () => navigate(`/movies/${response.data.id}`),
      })
    } catch (e) {
      reset(data)
      renderFeedback('error', {
        message: 'Invalid email or password',
      })
    }
  }

  return (
    <>
      {FeedbackElement}
      <div className="body-df">
        <Header />
        <main className="mx-auto max-w-[40rem] pt-16 pb-12">
          <h1 className="text-center">
            <h1 className="flex items-center justify-center gap-x-2">
              <FilmSlate size={32} className="text-gray-200" />
              <Text variant="title">Movie Registration</Text>
            </h1>
          </h1>
          {components && (
            <form
              className="mt-8 flex flex-col gap-y-3"
              onSubmit={handleSubmit(onValidSubmit)}
            >
              <Input.Root>
                <Input.Label>Name:</Input.Label>
                <Input.Box
                  type="text"
                  placeholder="Type the movie name"
                  {...register('name')}
                />
                <Input.Message>{errors.name?.message}</Input.Message>
              </Input.Root>
              <Input.Root>
                <Input.Label>Description:</Input.Label>
                <Input.Box
                  type="text-area"
                  placeholder="Type the movie description"
                  {...register('description')}
                />
                <Input.Message>{errors.description?.message}</Input.Message>
              </Input.Root>
              <Input.Root>
                <Input.Label>Poster:</Input.Label>
                <Input.Box
                  type="text"
                  placeholder="Type the movie poster URL"
                  {...register('poster')}
                />
                <Input.Message>{errors.poster?.message}</Input.Message>
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

              <div className="flex w-full justify-between gap-x-4">
                <div className="w-full">
                  <Input.Root>
                    <Input.Label>Year:</Input.Label>
                    <Input.Box
                      type="number"
                      placeholder="Type the movie year"
                      {...register('year')}
                    />
                    <Input.Message>{errors.year?.message}</Input.Message>
                  </Input.Root>
                </div>
                <div className="w-full">
                  <Input.Root>
                    <Input.Label>Duration in Minutes:</Input.Label>
                    <Input.Box
                      type="number"
                      placeholder="Type the movie duration in minutes"
                      {...register('minutes')}
                    />
                    <Input.Message>{errors.minutes?.message}</Input.Message>
                  </Input.Root>
                </div>
              </div>
              <div className="mt-6 w-full">
                <Button type="submit" isSubmitting={isSubmitting}>
                  Submit
                </Button>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  )
}
