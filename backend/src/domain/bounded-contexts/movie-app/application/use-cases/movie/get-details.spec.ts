import { ActorFactory } from '../../__tests__/factories/actor'
import { DirectorFactory } from '../../__tests__/factories/director'
import { GenreFactory } from '../../__tests__/factories/genre'
import { MovieFactory } from '../../__tests__/factories/movie'
import { VoteFactory } from '../../__tests__/factories/vote'
import { InMemoryActorRepository } from '../../__tests__/repositories/actor'
import { InMemoryDirectorRepository } from '../../__tests__/repositories/director'
import { InMemoryGenreRepository } from '../../__tests__/repositories/genre'
import { InMemoryMovieRepository } from '../../__tests__/repositories/movie'
import { InMemoryVoteRepository } from '../../__tests__/repositories/vote'
import { GetMovieDetailsUseCase } from './get-details'

describe('GetMovieDetailsUseCase', () => {
  const actorRepository = new InMemoryActorRepository()
  const directorRepository = new InMemoryDirectorRepository()
  const genreRepository = new InMemoryGenreRepository()
  const movieRepository = new InMemoryMovieRepository()
  const voteRepository = new InMemoryVoteRepository()
  const voteFactory = new VoteFactory(voteRepository)
  const genreFactory = new GenreFactory(genreRepository)
  const actorFactory = new ActorFactory(actorRepository)
  const directorFactory = new DirectorFactory(directorRepository)
  const movieFactory = new MovieFactory(movieRepository)
  const sut = new GetMovieDetailsUseCase(
    directorRepository,
    voteRepository,
    genreRepository,
    actorRepository,
    movieRepository,
  )

  beforeEach(async () => {
    await genreRepository.reset()
    await voteRepository.reset()
    await directorRepository.reset()
    await actorRepository.reset()
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
      rating: 0,
      directors,
      genres,
      actors,
    })
  })

  it('should get correct rating of a movie', async () => {
    const movie = await movieFactory.create()
    await voteFactory.createMany([
      { movieId: movie.id, rating: 2 },
      { movieId: movie.id, rating: 3 },
      { movieId: movie.id, rating: 4 },
    ])

    const response = await sut.execute({
      id: movie.id.toString(),
    })

    expect(response.rating).toBe(3)
  })
})
