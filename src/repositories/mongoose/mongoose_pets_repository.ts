import { Pet } from '@/database'
import PetsRepository from '../pets_repository'
import { IPet } from '@/models/pet'

export class MongoosePetsRepository implements PetsRepository {
  async register(data: IPet): Promise<IPet> {
    const pet = new Pet(data)

    pet.save()

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
    const pets = await Pet.find({
      organization_id,
    })

    let filteredPets: IPet[] = [...pets]

    if (filters.age !== undefined) {
      filteredPets = filteredPets.filter((pet) => pet.age === filters.age)
    }

    if (filters.energy_level !== undefined) {
      filteredPets = filteredPets.filter(
        (pet) => pet.energy_level === filters.energy_level,
      )
    }

    if (filters.size_level !== undefined) {
      filteredPets = filteredPets.filter(
        (pet) => pet.size_level === filters.size_level,
      )
    }

    if (filters.level_of_independence !== undefined) {
      filteredPets = filteredPets.filter(
        (pet) => pet.level_of_independence === filters.level_of_independence,
      )
    }

    return filteredPets
  }

  async getPetDetails(pet_id: string): Promise<IPet | null | undefined> {
    const pet = await Pet.findById(pet_id)

    return pet
  }
}
