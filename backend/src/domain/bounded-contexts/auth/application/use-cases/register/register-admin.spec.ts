import { BCryptHashModule } from '@/adapters/hash/implementations/bycript'
import { some } from '@tests/utils/some'

import { createUserData, UserFactory } from '../../__tests__/factories/user'
import { InMemoryUserRepository } from '../../__tests__/repositories/user'
import { User } from '../../../enterprise/entities/user'
import { InvalidTokenError } from './errors/invalid-token'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { RegisterAdminUserUseCase } from './register-admin'
import { InvalidEmailError } from './errors/invalid-email'

describe('RegisterAdminUserUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const hashModule = new BCryptHashModule()
  const SECRET_ACCESS_TOKEN = some.text()
  const sut = new RegisterAdminUserUseCase(
    userRepository,
    hashModule,
    SECRET_ACCESS_TOKEN,
  )

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should create a user', async () => {
    const response = await sut.execute({
      data: createUserData(),
      accessToken: SECRET_ACCESS_TOKEN,
    })

    const newUser = await userRepository.get({ id: response.id })
    expect(response).instanceOf(User)
    expect(newUser.isEqual(response)).toBeTruthy()
    expect(newUser.props.isDeleted).toBeFalsy()
  })

  it('should create a admin user', async () => {
    const response = await sut.execute({
      data: createUserData(),
      accessToken: SECRET_ACCESS_TOKEN,
      // @ts-ignore
      isAdmin: false,
    })

    expect(response.props.isAdmin).toBeTruthy()
  })

  it('show throw a InvalidEmailError if the email is invalid', async () => {
    await expect(async () => {
      await sut.execute({
        data: createUserData({
          email: 'invalid-email',
        }),
        accessToken: SECRET_ACCESS_TOKEN,
      })
    }).rejects.toThrowError(InvalidEmailError)
  })

  it('should throw InvalidTokenError if the access token is invalid', async () => {
    await expect(async () => {
      await sut.execute({
        data: createUserData(),
        accessToken: some.text(),
      })
    }).rejects.toThrowError(InvalidTokenError)
  })

  it('should create a user with encrypted password', async () => {
    const rawPassword = some.text()
    const response = await sut.execute({
      data: createUserData({
        password: rawPassword,
      }),
      accessToken: SECRET_ACCESS_TOKEN,
    })

    expect(response.props.password !== rawPassword).toBeTruthy()
  })

  it('should throw UserAlreadyExistsError if the email already exists', async () => {
    const email = some.email()
    await userFactory.create({
      email,
    })

    await expect(async () => {
      await sut.execute({
        data: { email, password: some.text() },
        accessToken: SECRET_ACCESS_TOKEN,
      })
    }).rejects.toThrowError(UserAlreadyExistsError)
  })
})
