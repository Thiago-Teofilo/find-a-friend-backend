import { MongooseOrganizationsRepository } from '@/repositories/mongoose/mongoose-organizations-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const organizationRepository = new MongooseOrganizationsRepository()
  const registerUseCase = new RegisterUseCase(organizationRepository)

  return registerUseCase
}
