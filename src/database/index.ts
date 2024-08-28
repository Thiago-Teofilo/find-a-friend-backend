import { env } from '@/env'
import { IOrganization, organizationSchema } from '@/models/organization'
import { IPet, petSchema } from '@/models/pet'
import mongoose from 'mongoose'

export const connectToMongo = async () => {
  await mongoose.connect(env.DATABASE_URL)
}

export const Organization = mongoose.model<IOrganization>(
  'Organization',
  organizationSchema,
)
export const Pet = mongoose.model<IPet>('Pet', petSchema)
