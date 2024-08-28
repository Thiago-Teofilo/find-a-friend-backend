import { MongooseOrganizationsRepository } from '@/repositories/mongoose/mongoose-organizations-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const organizationRepository = new MongooseOrganizationsRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationRepository)

  return authenticateUseCase
}
