import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { Actor } from '../../../enterprise/entities/actor'
import { Director } from '../../../enterprise/entities/director'
import { Genre } from '../../../enterprise/entities/genre'
import { Movie, MovieProps } from '../../../enterprise/entities/movie'
import { MovieActor } from '../../../enterprise/entities/movie-actor'
import { MovieDirector } from '../../../enterprise/entities/movie-director'
import { MovieGenre } from '../../../enterprise/entities/movie-genre'
import { MovieActorWatchedList } from '../../../enterprise/entities/watched-lists/movie-actor'
import { MovieDirectorWatchedList } from '../../../enterprise/entities/watched-lists/movie-director'
import { MovieGenreWatchedList } from '../../../enterprise/entities/watched-lists/movie-genre'
import { MovieRepository } from '../../repositories/movie'

export function createMovieData({
  name = some.text(),
  year = some.integer(2000, 2024),
  poster = some.text(),
  description = some.text(),
  totalMinutes = some.integer(60, 240),
  directors = new MovieDirectorWatchedList(),
  genres = new MovieGenreWatchedList(),
  actors = new MovieActorWatchedList(),
}: Partial<MovieProps> = {}): MovieProps {
  return {
    name,
    year,
    poster,
    description,
    totalMinutes,
    directors,
    genres,
    actors,
  }
}

export class MovieFactory implements Factory<Movie> {
  constructor(private movieRepository: MovieRepository) {}

  async create(data: Partial<MovieProps> = {}) {
    return this.movieRepository.create(createMovieData(data))
  }

  async createWithRelatedData({
    data,
    manyToManyData,
  }: {
    data?: Partial<Omit<MovieProps, 'directors' | 'genres' | 'actors'>>
    manyToManyData?: {
      directors?: Director[]
      genres?: Genre[]
      actors?: Actor[]
    }
  }) {
    const movie = await Movie.create(createMovieData(data || {}))

    const movieDirectors = await Promise.all(
      (manyToManyData?.directors || []).map((director) =>
        MovieDirector.create({
          movieId: movie.id,
          directorId: director.id,
        }),
      ),
    )

    movie.props.directors = new MovieDirectorWatchedList(movieDirectors)

    const movieGenres = await Promise.all(
      (manyToManyData?.genres || []).map((genre) =>
        MovieGenre.create({
          movieId: movie.id,
          genreId: genre.id,
        }),
      ),
    )

    movie.props.genres = new MovieGenreWatchedList(movieGenres)

    const movieActors = await Promise.all(
      (manyToManyData?.actors || []).map((actor) =>
        MovieActor.create({
          movieId: movie.id,
          actorId: actor.id,
        }),
      ),
    )

    movie.props.actors = new MovieActorWatchedList(movieActors)

    return this.movieRepository.save(movie)
  }
}
