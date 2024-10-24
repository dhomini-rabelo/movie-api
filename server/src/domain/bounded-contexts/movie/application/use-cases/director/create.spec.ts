import { createDirectorData } from '../../__tests__/factories/director'
import { InMemoryDirectorRepository } from '../../__tests__/repositories/director'
import { Director } from '../../../enterprise/entities/director'
import { CreateDirectorUseCase } from './create'

describe('CreateDirectorUseCase', () => {
  const directorRepository = new InMemoryDirectorRepository()
  const sut = new CreateDirectorUseCase(directorRepository)

  beforeEach(async () => {
    await directorRepository.reset()
  })

  it('should create a director', async () => {
    const directorData = createDirectorData()
    const response = await sut.execute({
      ...directorData,
    })

    expect(response).instanceOf(Director)
    expect(
      (await directorRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })
})
