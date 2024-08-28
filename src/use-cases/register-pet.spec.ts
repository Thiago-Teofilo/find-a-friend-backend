import { expect, describe, it, beforeEach } from 'vitest'
import InMemoryPetsRepository from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import InMemoryOrganizationsRepository from '@/repositories/in-memory-repositories/in-memory-organizations-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository

let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register pet', async () => {
    const organization = await organizationRepository.register({
      name: 'Organização JS',
      location: {
        type: 'Point',
        coordinates: [46.2646546, 22.31125456],
      },
      email: 'johndoe@example.com',
      phone: '19 95566-5626',
      description: '',
      password_hash: await hash('123456', 6),
    })

    if (!organization._id) {
      throw new Error('Server Error')
    }

    const { pet } = await sut.execute({
      name: 'Amy',
      organization_id: organization._id,
      age: 'PUPPY',
      energy_level: 4,
      size_level: 2,
      level_of_independence: 2,
      area_size_level: 5,
      type: 'DOG',
      description: '',
      requirementsForAdoption: [
        {
          text: 'Ter um grande espaço',
        },
        {
          text: 'Ter brinquedos',
        },
      ],
    })

    expect(pet._id).toEqual(expect.any(String))
  })
})
