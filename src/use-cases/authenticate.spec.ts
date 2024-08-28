import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryOrganizationsRepository from '@/repositories/in-memory-repositories/in-memory-organizations-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await organizationRepository.register({
      name: 'Organização JS',
      location: {
        type: 'Point',
        coordinates: [46.2646546, 22.31125456],
      },
      email,
      password_hash: await hash(password, 6),
      phone: '19 95566-5626',
      description: '',
    })

    const { organization } = await sut.execute({ email, password })

    expect(organization.email).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationRepository.register({
      name: 'Organização JS',
      location: {
        type: 'Point',
        coordinates: [46.2646546, 22.31125456],
      },
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '19 95566-5626',
      description: '',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
