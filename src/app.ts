import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { organizationsRoutes } from './http/controllers/organizations/routes'
import { connectToMongo } from './database'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'

connectToMongo()

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(organizationsRoutes)
app.register(petsRoutes)
