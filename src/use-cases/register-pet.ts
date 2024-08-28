import { IPet } from '@/models/pet'
import PetsRepository from '@/repositories/pets_repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: 'PUPPY' | 'YOUNG' | 'ADULT' | 'MATURE'
  energy_level: number
  size_level: number
  level_of_independence: number
  area_size_level: number
  type: 'DOG' | 'CAT'
  description?: string
  requirementsForAdoption: {
    text: string
  }[]
  organization_id: string
}

interface RegisterPetUseCaseResponse {
  pet: IPet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    energy_level,
    size_level,
    level_of_independence,
    area_size_level,
    type,
    requirementsForAdoption,
    description,
    organization_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.register({
      name,
      age,
      energy_level,
      size_level,
      level_of_independence,
      area_size_level,
      type,
      requirementsForAdoption,
      description,
      organization_id,
    })

    return { pet }
  }
}
