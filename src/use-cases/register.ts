import { IOrganization } from '@/models/organization'
import OrganizationsRepository from '@/repositories/organizations_repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  location: {
    coordinates: number[]
  }
  phone: string
  description: string
  password: string
  email: string
}

interface RegisterUseCaseResponse {
  organization: IOrganization
}

export class RegisterUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    name,
    location,
    phone,
    description,
    password,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.register({
      name,
      location: {
        type: 'Point',
        coordinates: [location.coordinates[0], location.coordinates[1]],
      },
      phone,
      description,
      password_hash,
      email,
    })

    return { organization }
  }
}
