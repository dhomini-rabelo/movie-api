import { createActorData } from '../../__tests__/factories/actor'
import { InMemoryActorRepository } from '../../__tests__/repositories/actor'
import { Actor } from '../../../enterprise/entities/actor'
import { CreateActorUseCase } from './create'

describe('CreateActorUseCase', () => {
  const actorRepository = new InMemoryActorRepository()
  const sut = new CreateActorUseCase(actorRepository)

  beforeEach(async () => {
    await actorRepository.reset()
  })

  it('should create a actor', async () => {
    const actorData = createActorData()
    const response = await sut.execute({
      ...actorData,
    })

    expect(response).instanceOf(Actor)
    expect(
      (await actorRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })
})
