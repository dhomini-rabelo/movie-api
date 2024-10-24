import { BCryptHashModule } from '@/adapters/hash/implementations/bycript'
import { some } from '@tests/utils/some'

import { createUserData, UserFactory } from '../../__tests__/factories/user'
import { InMemoryUserRepository } from '../../__tests__/repositories/user'
import { User } from '../../../enterprise/entities/user'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { RegisterUserUseCase } from './register'

describe('RegisterUserUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const hashModule = new BCryptHashModule()
  const sut = new RegisterUserUseCase(userRepository, hashModule)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should create a user', async () => {
    const response = await sut.execute(createUserData())

    expect(response).instanceOf(User)
    expect(
      (await userRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })

  it('should create a user with encrypted password', async () => {
    const rawPassword = some.text()
    const response = await sut.execute(
      createUserData({
        password: rawPassword,
      }),
    )

    expect(response.props.password !== rawPassword).toBeTruthy()
  })

  it('should throw UserAlreadyExistsError if the username already exists', async () => {
    const username = some.text()
    await userFactory.create({
      username,
    })

    await expect(async () => {
      await sut.execute({ username, password: some.text() })
    }).rejects.toThrowError(UserAlreadyExistsError)
  })
})
