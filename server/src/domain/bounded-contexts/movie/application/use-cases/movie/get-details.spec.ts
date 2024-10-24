import { ActorFactory } from '../../__tests__/factories/actor'
import { DirectorFactory } from '../../__tests__/factories/director'
import { GenreFactory } from '../../__tests__/factories/genre'
import { MovieFactory } from '../../__tests__/factories/movie'
import { InMemoryActorRepository } from '../../__tests__/repositories/actor'
import { InMemoryDirectorRepository } from '../../__tests__/repositories/director'
import { InMemoryGenreRepository } from '../../__tests__/repositories/genre'
import { InMemoryMovieRepository } from '../../__tests__/repositories/movie'
import { GetMovieDetailsUseCase } from './get-details'

describe('GetMovieDetailsUseCase', () => {
  const actorRepository = new InMemoryActorRepository()
  const directorRepository = new InMemoryDirectorRepository()
  const genreRepository = new InMemoryGenreRepository()
  const movieRepository = new InMemoryMovieRepository()
  const genreFactory = new GenreFactory(genreRepository)
  const actorFactory = new ActorFactory(actorRepository)
  const directorFactory = new DirectorFactory(directorRepository)
  const movieFactory = new MovieFactory(movieRepository)
  const sut = new GetMovieDetailsUseCase(
    directorRepository,
    genreRepository,
    actorRepository,
    movieRepository,
  )

  beforeEach(async () => {
    await movieRepository.reset()
  })

  it('should get details of a movie', async () => {
    const directors = await Promise.all([
      directorFactory.create(),
      directorFactory.create(),
    ])
    const genres = await Promise.all([
      genreFactory.create(),
      genreFactory.create(),
    ])
    const actors = await Promise.all([
      actorFactory.create(),
      actorFactory.create(),
    ])
    const movie = await movieFactory.createWithRelatedData({
      manyToManyData: {
        directors,
        genres,
        actors,
      },
    })

    const response = await sut.execute({
      id: movie.id.toString(),
    })

    expect(response).toEqual({
      ...movie.props,
      id: movie.id,
      directors,
      genres,
      actors,
    })
  })
})
