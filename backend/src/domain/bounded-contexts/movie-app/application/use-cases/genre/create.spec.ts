import { createGenreData } from '../../__tests__/factories/genre'
import { InMemoryGenreRepository } from '../../__tests__/repositories/genre'
import { Genre } from '../../../enterprise/entities/genre'
import { CreateGenreUseCase } from './create'

describe('CreateGenreUseCase', () => {
  const genreRepository = new InMemoryGenreRepository()
  const sut = new CreateGenreUseCase(genreRepository)

  beforeEach(async () => {
    await genreRepository.reset()
  })

  it('should create a genre', async () => {
    const genreData = createGenreData()
    const response = await sut.execute({
      ...genreData,
    })

    expect(response).instanceOf(Genre)
    expect(
      (await genreRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })
})
