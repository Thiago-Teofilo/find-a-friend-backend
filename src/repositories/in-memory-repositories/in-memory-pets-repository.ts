import { randomUUID } from 'crypto'
import PetsRepository from '../pets_repository'
import { IPet } from '@/models/pet'

export default class InMemoryPetsRepository implements PetsRepository {
  public items: IPet[] = []

  async register(data: IPet): Promise<IPet> {
    const pet: IPet = {
      _id: randomUUID(),
      name: data.name,
      organization_id: data.organization_id,
      age: data.age,
      energy_level: data.energy_level,
      size_level: data.size_level,
      level_of_independence: data.level_of_independence,
      area_size_level: data.area_size_level,
      type: data.type,
      description: data.description,
      requirementsForAdoption: data.requirementsForAdoption,
    }

    this.items.push(pet)

    return pet
  }

  async findByOrganizationWithFilters(
    organization_id: string,
    filters: {
      age: string | null | undefined
      energy_level: number | null | undefined
      size_level: number | null | undefined
      level_of_independence: number | null | undefined
    },
  ): Promise<IPet[]> {
    const pets = this.items.filter(
      (item) => item.organization_id === organization_id,
    )

    let filteredPets: IPet[] = [...pets]

    if (filters.age) {
      filteredPets = filteredPets.filter((pet) => pet.age === filters.age)
    }

    if (filters.energy_level) {
      filteredPets = filteredPets.filter(
        (pet) => pet.energy_level === filters.energy_level,
      )
    }

    if (filters.size_level) {
      filteredPets = filteredPets.filter(
        (pet) => pet.size_level === filters.size_level,
      )
    }

    if (filters.level_of_independence) {
      filteredPets = filteredPets.filter(
        (pet) => pet.level_of_independence === filters.level_of_independence,
      )
    }

    return filteredPets
  }

  async getPetDetails(pet_id: string): Promise<IPet | null | undefined> {
    const pet = this.items.find((item) => item._id === pet_id)

    return pet
  }
}
