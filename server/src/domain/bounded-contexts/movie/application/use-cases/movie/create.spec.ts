import { DirectorFactory } from '../../__tests__/factories/director'
import { createMovieData } from '../../__tests__/factories/movie'
import { InMemoryDirectorRepository } from '../../__tests__/repositories/director'
import { InMemoryMovieRepository } from '../../__tests__/repositories/movie'
import { Movie } from '../../../enterprise/entities/movie'
import { CreateMovieUseCase } from './create'

describe('CreateMovieUseCase', () => {
  const movieRepository = new InMemoryMovieRepository()
  const directorRepository = new InMemoryDirectorRepository()
  const directorFactory = new DirectorFactory(directorRepository)
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

    const response = await sut.execute({
      name: movieData.name,
      directorsId: directors.map((director) => director.id.toString()),
    })

    expect(response).instanceOf(Movie)
    expect(
      (await movieRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
    expect(response.props.directors.getItems()).toHaveLength(directors.length)
  })
})
