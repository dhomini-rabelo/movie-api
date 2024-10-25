import { Text } from '../../common/Text'
import { MovieEntity } from '../../../../code/entities'
import { Link } from 'react-router-dom'
import { FilmSlate } from 'phosphor-react'
import { showMovieTime } from '../../../../code/utils'

export function Movie({ movie }: { movie: MovieEntity }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="folder bg-Black-100 rounded-2xl px-4 py-5 border-2 border-transparent hover:border-Gray-500 cursor-pointer relative"
    >
      <strong className="flex items-center justify-center gap-x-1.5">
        <FilmSlate size={28} className="text-gray-200" />
        <Text variant="title" size="md">
          {movie.name}
        </Text>
      </strong>
      <div className="mt-0.5 text-center">
        <Text size="sm" weight="regular" color="Gray-700">
          {movie.year} - {showMovieTime(movie.totalMinutes)}
        </Text>
      </div>
      <main className="mt-2.5">
        <img
          src={movie.poster}
          alt={movie.name}
          className="rounded-lg w-full h-[24.25rem] object-cover"
        />
      </main>
    </Link>
  )
}
