import { expect, describe, it, beforeEach } from 'vitest'
import InMemoryPetsRepository from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import InMemoryOrganizationsRepository from '@/repositories/in-memory-repositories/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { FetchNearbyPetsWithFiltersUseCase } from './fetch-nearby-pets-with-filters'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository

let sut: FetchNearbyPetsWithFiltersUseCase

describe('Fetch Nearby Pets With Filters Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    sut = new FetchNearbyPetsWithFiltersUseCase(
      organizationRepository,
      petsRepository,
    )
  })

  it('should be able to fetch nearby pets with filters', async () => {
    let organization = await organizationRepository.register({
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

    await petsRepository.register({
      name: 'Amy',
      organization_id: organization._id,
      age: 'PUPPY',
      energy_level: 5,
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

    await petsRepository.register({
      name: 'Megg',
      organization_id: organization._id,
      age: 'ADULT',
      energy_level: 4,
      size_level: 2,
      level_of_independence: 4,
      area_size_level: 3,
      type: 'DOG',
      description: '',
      requirementsForAdoption: [
        {
          text: 'Não oferecer chocolate',
        },
        {
          text: 'Ter brinquedos',
        },
      ],
    })

    organization = await organizationRepository.register({
      name: 'Organização TS',
      location: {
        type: 'Point',
        coordinates: [-46.5317818, -22.5926876],
      },
      email: 'theo@example.com',
      phone: '19 95566-5886',
      description: '',
      password_hash: await hash('123455', 6),
    })

    if (!organization._id) {
      throw new Error('Server Error')
    }

    await petsRepository.register({
      name: 'Pandora',
      organization_id: organization._id,
      age: 'ADULT',
      energy_level: 4,
      size_level: 5,
      level_of_independence: 3,
      area_size_level: 5,
      type: 'DOG',
      description: '',
      requirementsForAdoption: [
        {
          text: 'Ter disponibilidade para brincar',
        },
        {
          text: 'Ter brinquedos',
        },
      ],
    })

    organization = await organizationRepository.register({
      name: 'Organização AWS',
      location: {
        type: 'Point',
        coordinates: [-46.5920781, -23.6770987],
      },
      email: 'theof@example.com',
      phone: '19 95566-5986',
      description: '',
      password_hash: await hash('123846', 6),
    })

    if (!organization._id) {
      throw new Error('Server Error')
    }

    await petsRepository.register({
      name: 'Lily',
      organization_id: organization._id,
      age: 'ADULT',
      energy_level: 3,
      size_level: 1,
      level_of_independence: 3,
      area_size_level: 3,
      type: 'DOG',
      description: '',
      requirementsForAdoption: [
        {
          text: 'Ter disponibilidade para brincar',
        },
        {
          text: 'Ter brinquedos',
        },
      ],
    })

    const { pets: filteredPets } = await sut.execute({
      latitude: -22.5926876,
      longitude: -46.5317818,
      filters: {
        age: 'ADULT',
        energy_level: 4,
      },
    })

    expect(filteredPets).toHaveLength(2)
  })
})
