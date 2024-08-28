import { IPet } from '@/models/pet'

export default interface PetsRepository {
  register(data: IPet): Promise<IPet>
  findByOrganizationWithFilters(
    organization_id: string,
    {
      age,
      energy_level,
      size_level,
      level_of_independence,
    }: {
      age?: string | null | undefined
      energy_level?: number | null | undefined
      size_level?: number | null | undefined
      level_of_independence?: number | null | undefined
    },
  ): Promise<IPet[]>
  getPetDetails(pet_id: string): Promise<IPet | null | undefined>
}
