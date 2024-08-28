import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import OrganizationsRepository from '../organizations_repository'
import { IOrganization } from '@/models/organization'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { randomUUID } from 'crypto'
import { calculateDistance } from '@/utils/repositories/in-memory-repository/calculate-distance'

export default class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: IOrganization[] = []

  async register(data: IOrganization): Promise<IOrganization> {
    const organization: IOrganization = {
      _id: randomUUID(),
      name: data.name,
      location: {
        type: 'Point',
        coordinates: [
          data.location.coordinates[0], // Longitude
          data.location.coordinates[1], // Latitude
        ],
      },
      phone: data.phone,
      description: data.description,
      password_hash: data.password_hash,
      email: data.email,
      pets: [],
    }

    if (this.items.find((item) => item.email === organization.email)) {
      throw new OrganizationAlreadyExistsError()
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<IOrganization> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    return organization
  }

  async findNearby(
    latitude: number,
    longitude: number,
  ): Promise<IOrganization[]> {
    const radius = 50 // Km

    const organizationsNearby = this.items.filter((item) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        item.location.coordinates[1],
        item.location.coordinates[0],
      )

      return distance <= radius
    })

    return organizationsNearby
  }
}
