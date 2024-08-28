import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)

  app.post('/sessions', authenticate)
}
