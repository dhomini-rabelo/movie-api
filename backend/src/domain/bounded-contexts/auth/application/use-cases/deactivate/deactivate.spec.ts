import { UserFactory } from '../../__tests__/factories/user'
import { InMemoryUserRepository } from '../../__tests__/repositories/user'
import { User } from '../../../enterprise/entities/user'
import { DeactivateUserUseCase } from './deactivate'
import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'

describe('DeactivateUserUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const sut = new DeactivateUserUseCase(userRepository)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should deactivate a user', async () => {
    const user = await userFactory.create()

    const response = await sut.execute({
      id: user.id.toString(),
    })

    expect(response).instanceOf(User)
    expect(response.props.isDeleted).toBeTruthy()
  })

  it("should guarantee that deactivated user can't be found", async () => {
    await userFactory.create()
    const user = await userFactory.create()
    const response = await sut.execute({
      id: user.id.toString(),
    })

    expect(await userRepository.findUnique({ id: response.id })).toBeNull()
    expect(await userRepository.findFirst({ id: response.id })).toBeNull()
    expect(await userRepository.findMany({})).length(1)
    await expect(async () => {
      await userRepository.get({ id: response.id })
    }).rejects.toThrowError(ResourceNotFoundError)
    await expect(async () => {
      await userRepository.update(response.id, { isDeleted: false  })
    }).rejects.toThrowError(ResourceNotFoundError)
  })
})
