import { IPet } from '@/models/pet'
import PetsRepository from '@/repositories/pets_repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetDetailsUseCaseRequest {
  pet_id: string
}

interface FetchPetDetailsUseCaseResponse {
  pet: IPet
}

export class FetchPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_id,
  }: FetchPetDetailsUseCaseRequest): Promise<FetchPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.getPetDetails(pet_id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
