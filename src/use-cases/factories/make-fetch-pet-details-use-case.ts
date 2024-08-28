import { MongoosePetsRepository } from '@/repositories/mongoose/mongoose_pets_repository'
import { FetchPetDetailsUseCase } from '../fetch-pet-details'

export function makeFetchPetDetailsUseCase() {
  const petsRepository = new MongoosePetsRepository()

  const fetchPetDetailsUseCase = new FetchPetDetailsUseCase(petsRepository)

  return fetchPetDetailsUseCase
}
