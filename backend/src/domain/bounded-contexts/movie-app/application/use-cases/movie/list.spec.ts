import { ListMoviesUseCase } from './list'
import { MovieRepository } from '../../repositories/movie'
import { InMemoryMovieRepository } from '../../__tests__/repositories/movie'
import { GenreFactory } from '../../__tests__/factories/genre'
import { ActorFactory } from '../../__tests__/factories/actor'
import { DirectorFactory } from '../../__tests__/factories/director'
import { InMemoryGenreRepository } from '../../__tests__/repositories/genre'
import { InMemoryActorRepository } from '../../__tests__/repositories/actor'
import { InMemoryDirectorRepository } from '../../__tests__/repositories/director'
import { MovieFactory } from '../../__tests__/factories/movie'

describe('ListMoviesUseCase', () => {
  const movieRepository = new InMemoryMovieRepository()
  const genreFactory = new GenreFactory(new InMemoryGenreRepository())
  const actorFactory = new ActorFactory(new InMemoryActorRepository())
  const directorFactory = new DirectorFactory(new InMemoryDirectorRepository())
  const moviFactory = new MovieFactory(movieRepository)
  const sut = new ListMoviesUseCase(movieRepository)

  beforeEach(async () => {
    await movieRepository.reset()
  })

  it('should filter by name', async () => {
    const genre = await genreFactory.create()
    const actor = await actorFactory.create()
    const director = await directorFactory.create()
    const movie = await moviFactory.createWithRelatedData({
      manyToManyData: {
        genres: [genre],
        actors: [actor],
        directors: [director],
      },
    })

    const response = await sut.execute({
      name: movie.props.name.slice(0, 3),
    })

    expect(response).toHaveLength(1)
    expect(response[0].isEqual(movie)).toBeTruthy()
  })

  it('should filter by genre', async () => {
    const genre = await genreFactory.create()
    const actor = await actorFactory.create()
    const director = await directorFactory.create()
    const movie = await moviFactory.createWithRelatedData({
      manyToManyData: {
        genres: [genre],
        actors: [actor],
        directors: [director],
      },
    })

    const response = await sut.execute({
      genreId: genre.id.toString(),
    })

    expect(response).toHaveLength(1)
    expect(response[0].isEqual(movie)).toBeTruthy()
  })

  it('should filter by actor', async () => {
    const genre = await genreFactory.create()
    const actor = await actorFactory.create()
    const director = await directorFactory.create()
    const movie = await moviFactory.createWithRelatedData({
      manyToManyData: {
        genres: [genre],
        actors: [actor],
        directors: [director],
      },
    })

    const response = await sut.execute({
      actorId: actor.id.toString(),
    })

    expect(response).toHaveLength(1)
    expect(response[0].isEqual(movie)).toBeTruthy()
  })

  it('should filter by director', async () => {
    const genre = await genreFactory.create()
    const actor = await actorFactory.create()
    const director = await directorFactory.create()
    const movie = await moviFactory.createWithRelatedData({
      manyToManyData: {
        genres: [genre],
        actors: [actor],
        directors: [director],
      },
    })

    const response = await sut.execute({
      directorId: director.id.toString(),
    })

    expect(response).toHaveLength(1)
    expect(response[0].isEqual(movie)).toBeTruthy()
  })

  it('should filter by multiple filters', async () => {
    const genre = await genreFactory.create()
    const actor = await actorFactory.create()
    const director = await directorFactory.create()
    const movie = await moviFactory.createWithRelatedData({
      manyToManyData: {
        genres: [genre],
        actors: [actor],
        directors: [director],
      },
    })

    const response = await sut.execute({
      name: movie.props.name.slice(0, 3),
      genreId: genre.id.toString(),
      actorId: actor.id.toString(),
      directorId: director.id.toString(),
    })

    expect(response).toHaveLength(1)
    expect(response[0].isEqual(movie)).toBeTruthy()
  })

})