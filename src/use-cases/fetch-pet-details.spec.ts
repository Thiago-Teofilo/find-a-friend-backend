import { expect, describe, it, beforeEach } from 'vitest'
import InMemoryPetsRepository from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import InMemoryOrganizationsRepository from '@/repositories/in-memory-repositories/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { FetchPetDetailsUseCase } from './fetch-pet-details'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository

let sut: FetchPetDetailsUseCase

describe('Fetch Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    sut = new FetchPetDetailsUseCase(petsRepository)
  })

  it('should be able to fetch pet details', async () => {
    const organization = await organizationRepository.register({
      name: 'Organização JS',
      location: {
        type: 'Point',
        coordinates: [-46.5317818, -22.5926876],
      },
      email: 'johndoe@example.com',
      phone: '19 95566-5626',
      description: '',
      password_hash: await hash('123456', 6),
    })

    if (!organization._id) {
      throw new Error('Server Error')
    }

    const { _id } = await petsRepository.register({
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

    if (!_id) {
      throw new Error('Server Error')
    }

    const petResult = await sut.execute({ pet_id: _id })

    expect(petResult.pet._id).toEqual(_id)
  })
})
