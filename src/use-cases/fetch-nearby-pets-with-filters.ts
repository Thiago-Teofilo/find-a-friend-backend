import { IPet } from '@/models/pet'
import OrganizationsRepository from '@/repositories/organizations_repository'
import PetsRepository from '@/repositories/pets_repository'

interface FetchNearbyPetsWithFiltersUseCaseRequest {
  latitude: number
  longitude: number
  filters: {
    age?: string | null | undefined
    energy_level?: number | null | undefined
    size_level?: number | null | undefined
    level_of_independence?: number | null | undefined
  }
}

interface FetchNearbyPetsWithFiltersUseCaseResponse {
  pets: IPet[]
}

export class FetchNearbyPetsWithFiltersUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    latitude,
    longitude,
    filters,
  }: FetchNearbyPetsWithFiltersUseCaseRequest): Promise<FetchNearbyPetsWithFiltersUseCaseResponse> {
    const pets: IPet[] = []

    const nearbyOrganizations = await this.organizationsRepository.findNearby(
      latitude,
      longitude,
    )

    for (const organization of nearbyOrganizations) {
      if (organization._id) {
        const results = await this.petsRepository.findByOrganizationWithFilters(
          organization._id,
          filters,
        )
        pets.push(...results)
      }
    }

    return { pets }
  }
}
