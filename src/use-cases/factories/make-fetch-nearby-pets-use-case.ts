import { MongoosePetsRepository } from '@/repositories/mongoose/mongoose_pets_repository'
import { MongooseOrganizationsRepository } from '@/repositories/mongoose/mongoose-organizations-repository'
import { FetchNearbyPetsWithFiltersUseCase } from '../fetch-nearby-pets-with-filters'

export function makeFetchNearbyPetsUseCase() {
  const organizationsRepository = new MongooseOrganizationsRepository()
  const petsRepository = new MongoosePetsRepository()

  const fetchNearbyPetsWithFiltersUseCase =
    new FetchNearbyPetsWithFiltersUseCase(
      organizationsRepository,
      petsRepository,
    )

  return fetchNearbyPetsWithFiltersUseCase
}
