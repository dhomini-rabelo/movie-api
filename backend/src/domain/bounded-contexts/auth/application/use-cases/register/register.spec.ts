import { BCryptHashModule } from '@/adapters/hash/implementations/bycript'
import { some } from '@tests/utils/some'

import { createUserData, UserFactory } from '../../__tests__/factories/user'
import { InMemoryUserRepository } from '../../__tests__/repositories/user'
import { User } from '../../../enterprise/entities/user'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { RegisterUserUseCase } from './register'
import { InvalidEmailError } from './errors/invalid-email'
import { ForbiddenNonAdminUser } from './errors/forbidden-non-admin-user'

describe('RegisterUserUseCase', () => {
  const userRepository = new InMemoryUserRepository()
  const userFactory = new UserFactory(userRepository)
  const hashModule = new BCryptHashModule()
  const sut = new RegisterUserUseCase(userRepository, hashModule)

  beforeEach(async () => {
    await userRepository.reset()
  })

  it('should create a user', async () => {
    const adminUser = await userFactory.create({
      isAdmin: true,
    })
    
    const response = await sut.execute({
      data: createUserData(),
      createdBy: adminUser.id.toValue(),
    })
    
    const newUser = await userRepository.get({ id: response.id })
    expect(response).instanceOf(User)
    expect(newUser.isEqual(response)).toBeTruthy()
    expect(newUser.props.isDeleted).toBeFalsy()
  })
  
  it('should create a non-admin user', async () => {
    const adminUser = await userFactory.create({
      isAdmin: true,
    })

    const response = await sut.execute({
      data: {
        ...createUserData(),
        // @ts-ignore
        isAdmin: true,
      },
      createdBy: adminUser.id.toValue(),
    })

    expect(response.props.isAdmin).toBeFalsy()
  })

  it('should throw ForbiddenNonAdminUser if the user is not an admin', async () => {
    await expect(async () => {
      const nonAdminUser = await userFactory.create({
        isAdmin: false,
      })

      await sut.execute({
        data: createUserData(),
        createdBy: nonAdminUser.id.toValue(),
      })
    }).rejects.toThrowError(ForbiddenNonAdminUser)
  })

  it('show throw a InvalidEmailError if the email is invalid', async () => {
    await expect(async () => {
      const adminUser = await userFactory.createAdmin()

      await sut.execute({
        data: {
          ...createUserData(),
          email: 'invalid-email',
        },
        createdBy: adminUser.id.toValue(),
      })
    }).rejects.toThrowError(InvalidEmailError)
  })

  it('should create a user with encrypted password', async () => {
    const adminUser = await userFactory.createAdmin()
    const rawPassword = some.text()

    const response = await sut.execute({
      data: createUserData({
        password: rawPassword,
      }),
      createdBy: adminUser.id.toValue(),
    })

    expect(response.props.password !== rawPassword).toBeTruthy()
  })

  it('should throw UserAlreadyExistsError if the email already exists', async () => {
    const email = some.email()
    const adminUser = await userFactory.createAdmin()
    await userFactory.create({
      email,
    })

    await expect(async () => {
      await sut.execute({ data: {email, password: some.text()}, createdBy: adminUser.id.toValue() })
    }).rejects.toThrowError(UserAlreadyExistsError)
  })
})
