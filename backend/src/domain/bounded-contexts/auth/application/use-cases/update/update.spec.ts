import { UserFactory } from '../../__tests__/factories/user'
import { InMemoryUserRepository } from '../../__tests__/repositories/user'
import { User } from '../../../enterprise/entities/user'
import { UpdateUserUseCase } from './update'

describe('UpdateUserUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const sut = new UpdateUserUseCase(userRepository)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should update a user', async () => {
    const user = await userFactory.create()
    const newemail = 'new-email'

    const response = await sut.execute({
      id: user.id.toString(),
      data: {
        email: newemail,
      },
    })

    expect(response).instanceOf(User)
    expect(response.props.email).toBe(newemail)
  })
})
