import { Text } from '../../components/common/Text'
import { Header } from '../../components/utils/Header'
import { useQuery } from '@tanstack/react-query'
import {
  ActorEntity,
  DirectorEntity,
  GenreEntity,
  MovieEntity,
} from '../../../code/entities'
import { client } from '../../../code/settings'
import { useParams } from 'react-router-dom'
import { FilmSlate, Star, StarHalf } from 'phosphor-react'
import { showMovieTime } from '../../../code/utils'

type MovieData = MovieEntity & {
  directors: DirectorEntity[]
  genres: GenreEntity[]
  actors: ActorEntity[]
  rating: number
}

export function MoviePage() {
  const { movieId } = useParams<{ movieId: string }>()
  const { data: movie } = useQuery<MovieData>({
    queryKey: [`movie-${movieId}`],
    queryFn: async () => {
      return client
        .post('/movie-app/movie/get-details', {
          id: movieId,
        })
        .then((res) => res.data)
    },
  })

  return movie ? (
    <div className="body-df">
      <Header />
      <main className="w-full max-w-[70rem] mx-auto px-8">
        <div className="mt-12 flex items-center justify-center">
          <div className="flex justify-center items-center w-100">
            <h1 className="flex items-center justify-center gap-x-2">
              <FilmSlate size={32} className="text-gray-200" />
              <Text variant="title">
                {movie.name} ({movie.year})
              </Text>
            </h1>
          </div>
        </div>
        <section className="folders grid grid-cols-2 sm:grid-cols-1 mt-8 gap-x-4 gap-y-8 pb-12">
          <div className="flex flex-col gap-y-4 sm:order-2">
            <div>
              <Text size="sm" weight="bold" color="Gray-700">
                Description
              </Text>
              <div className="flex gap-x-2">
                <Text size="sm" weight="regular">
                  {movie.description}
                </Text>
              </div>
            </div>
            <div>
              <Text size="sm" weight="bold" color="Gray-700">
                Genres
              </Text>
              <div className="flex gap-x-2">
                <Text size="sm" weight="regular">
                  {movie.genres.map((genre) => genre.name).join(', ')}.
                </Text>
              </div>
            </div>
            <div>
              <Text size="sm" weight="bold" color="Gray-700">
                Directors
              </Text>
              <div className="flex gap-x-2">
                <Text size="sm" weight="regular">
                  {movie.directors.map((director) => director.name).join(', ')}.
                </Text>
              </div>
            </div>
            <div>
              <Text size="sm" weight="bold" color="Gray-700">
                Actors
              </Text>
              <div className="flex gap-x-2">
                <Text size="sm" weight="regular">
                  {movie.actors.map((actor) => actor.name).join(', ')}.
                </Text>
              </div>
            </div>
            <div>
              <Text size="sm" weight="bold" color="Gray-700">
                Duration
              </Text>
              <div className="flex gap-x-2">
                <Text size="sm" weight="regular">
                  {showMovieTime(movie.totalMinutes)}
                </Text>
              </div>
            </div>
            <div>
              <Text size="sm" weight="bold" color="Gray-700">
                Rating
              </Text>
              <div className="flex gap-x-2 mt-2">
                {[...Array(5)].map((_, index) =>
                  index <= movie.rating ? (
                    <Star
                      key={index}
                      size={24}
                      weight="fill"
                      className="text-yellow-300"
                    />
                  ) : index === Math.ceil(movie.rating) ? (
                    <StarHalf
                      key={index}
                      size={24}
                      weight="fill"
                      className="text-yellow-300"
                    />
                  ) : (
                    <Star
                      key={index}
                      size={24}
                      weight="regular"
                      className="text-yellow-300"
                    />
                  ),
                )}{' '}
                <span className="text-yellow-300">
                  ({Number(movie.rating + 1).toFixed(1)})
                </span>
              </div>
            </div>
          </div>
          <img
            src={movie.poster}
            alt={movie.name}
            className="rounded-lg w-full object-cover sm:order-1"
          />
        </section>
      </main>
    </div>
  ) : null
}
