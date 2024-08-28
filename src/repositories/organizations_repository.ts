import { IOrganization } from '@/models/organization'

export default interface OrganizationsRepository {
  register(data: IOrganization): Promise<IOrganization>
  findByEmail(email: string): Promise<IOrganization>
  findNearby(longitude: number, latitude: number): Promise<IOrganization[]>
}
