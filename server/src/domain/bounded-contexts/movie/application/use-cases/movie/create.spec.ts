import { DirectorFactory } from '../../__tests__/factories/director'
import { GenreFactory } from '../../__tests__/factories/genre'
import { createMovieData } from '../../__tests__/factories/movie'
import { InMemoryDirectorRepository } from '../../__tests__/repositories/director'
import { InMemoryGenreRepository } from '../../__tests__/repositories/genre'
import { InMemoryMovieRepository } from '../../__tests__/repositories/movie'
import { Movie } from '../../../enterprise/entities/movie'
import { CreateMovieUseCase } from './create'

describe('CreateMovieUseCase', () => {
  const movieRepository = new InMemoryMovieRepository()
  const genreFactory = new GenreFactory(new InMemoryGenreRepository())
  const directorFactory = new DirectorFactory(new InMemoryDirectorRepository())
  const sut = new CreateMovieUseCase(movieRepository)

  beforeEach(async () => {
    await movieRepository.reset()
  })

  it('should create a movie', async () => {
    const movieData = createMovieData()
    const directors = await Promise.all([
      directorFactory.create(),
      directorFactory.create(),
    ])
    const genres = await Promise.all([
      genreFactory.create(),
      genreFactory.create(),
    ])

    const response = await sut.execute({
      name: movieData.name,
      directorsId: directors.map((director) => director.id.toString()),
      genresId: genres.map((genre) => genre.id.toString()),
    })

    expect(response).instanceOf(Movie)
    expect(
      (await movieRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
    expect(response.props.directors.getItems()).toHaveLength(directors.length)
    expect(response.props.genres.getItems()).toHaveLength(genres.length)
  })
})
