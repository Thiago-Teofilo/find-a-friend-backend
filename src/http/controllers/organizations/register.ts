import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    phone: z.string(),
    description: z.string(),
    password: z.string(),
    email: z.string().email(),
  })
  const { name, longitude, latitude, phone, description, email, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    const organization = await registerUseCase.execute({
      name,
      location: {
        coordinates: [longitude, latitude],
      },
      phone,
      description,
      email,
      password,
    })
    return reply.status(201).send(organization)
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
