import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import InMemoryOrganizationsRepository from '@/repositories/in-memory-repositories/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      name: 'Organização JS',
      location: {
        coordinates: [46.2646546, 22.31125456],
      },
      email: 'johndoe@example.com',
      phone: '19 95566-5626',
      description: '',
      password: '123456',
    })

    expect(organization._id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Organização JS',
      location: {
        coordinates: [46.2646548, 22.31125458],
      },
      email: 'johndoe@example.com',
      phone: '19 95566-5626',
      description: '',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'Organização JS',
      location: {
        coordinates: [46.2646546, 22.31125456],
      },
      email,
      phone: '19 95566-5626',
      description: '',
      password: '123456',
    })

    await expect(async () =>
      sut.execute({
        name: 'Organização TS',
        location: {
          coordinates: [46.2646548, 22.31125458],
        },
        email,
        phone: '19 95886-5626',
        description: '',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
