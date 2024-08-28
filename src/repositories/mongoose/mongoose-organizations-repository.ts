import { Organization } from '@/database'
import OrganizationsRepository from '../organizations_repository'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { IOrganization } from '@/models/organization'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export class MongooseOrganizationsRepository
  implements OrganizationsRepository
{
  async register(data: IOrganization): Promise<IOrganization> {
    const otherOrganizationsWithSameEmail = await Organization.find({
      email: data.email,
    })

    if (otherOrganizationsWithSameEmail.length > 0) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = new Organization(data)
    organization.save()

    return organization
  }

  async findByEmail(email: string): Promise<IOrganization> {
    const organization = await Organization.findOne({
      email,
    })

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    return organization
  }

  async findNearby(
    longitude: number,
    latitude: number,
  ): Promise<IOrganization[]> {
    const radiusKm = 50 // Km

    const organizations = await Organization.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusKm,
        },
      },
    })

    return organizations
  }
}
