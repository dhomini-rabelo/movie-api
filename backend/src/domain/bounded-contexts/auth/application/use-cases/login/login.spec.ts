import { BCryptHashModule } from '@/adapters/hash/implementations/bycript'
import { JsonWebTokenJWTModule } from '@/adapters/jwt/implementations/json-web-token'
import { sleep } from '@tests/utils'
import { some } from '@tests/utils/some'

import { UserFactory } from '../../__tests__/factories/user'
import { InMemoryUserRepository } from '../../__tests__/repositories/user'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import { LoginUseCase } from './login'

describe('LoginUseCase', () => {
  const JWT_TOKEN_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const hashModule = new BCryptHashModule()
  const expirationTimeInMs = 1000
  const jwtModule = new JsonWebTokenJWTModule({
    secretKey: some.text(),
    expirationTimeInMs,
  })
  const sut = new LoginUseCase(userRepository, hashModule, jwtModule)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should get the authenticated token with JWT format', async () => {
    const password = some.text()
    const user = await userFactory.create({
      password: hashModule.generate(password),
    })

    const response = await sut.execute({
      email: user.props.email,
      password,
    })

    expect(response).toEqual({
      accessToken: expect.any(String),
    })
    expect(JWT_TOKEN_REGEX.test(response.accessToken)).toBeTruthy()
  })

  it('should guarantee that generated accessToken is valid', async () => {
    const password = some.text()
    const user = await userFactory.create({
      password: hashModule.generate(password),
    })

    const response = await sut.execute({
      email: user.props.email,
      password,
    })

    expect(jwtModule.getState(response.accessToken)).toEqual({
      value: user.id.toValue(),
      expired: false,
    })
  })

  it('should guarantee that accessToken expires after expiration time', async () => {
    const password = some.text()
    const user = await userFactory.create({
      password: hashModule.generate(password),
    })

    const response = await sut.execute({
      email: user.props.email,
      password,
    })

    await sleep(expirationTimeInMs + 1)

    expect(jwtModule.getState(response.accessToken)).toEqual({
      value: null,
      expired: true,
    })
  })

  it('should throw InvalidCredentialsError if the email does not exist', async () => {
    const user = await userFactory.create()

    await expect(async () => {
      await sut.execute({
        email: some.text(),
        password: user.props.password,
      })
    }).rejects.toThrowError(InvalidCredentialsError)
  })

  it('should throw InvalidCredentialsError if the password is incorrect', async () => {
    const user = await userFactory.create()

    await expect(async () => {
      await sut.execute({
        email: user.props.email,
        password: some.text(),
      })
    }).rejects.toThrowError(InvalidCredentialsError)
  })

  it('should throw InvalidCredentialsError if all payload is incorrect', async () => {
    await expect(async () => {
      await sut.execute({ email: some.text(), password: some.text() })
    }).rejects.toThrowError(InvalidCredentialsError)
  })
})
