import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.enum(['PUPPY', 'YOUNG', 'ADULT']),
    energy_level: z.number().max(5).min(1),
    size_level: z.number().max(5).min(1),
    level_of_independence: z.number().max(5).min(1),
    area_size_level: z.number().max(5).min(1),
    type: z.enum(['DOG', 'CAT']),
    description: z.string().optional().default(''),
    requirementsForAdoption: z.array(
      z.object({
        text: z.string(),
      }),
    ),
  })

  const {
    name,
    age,
    energy_level,
    size_level,
    level_of_independence,
    area_size_level,
    type,
    description,
    requirementsForAdoption,
  } = registerBodySchema.parse(request.body)

  try {
    await request.jwtVerify()

    const registerPetUseCase = makeRegisterPetUseCase()

    const organization_id = request.user.sub

    const pet = await registerPetUseCase.execute({
      name,
      age,
      energy_level,
      size_level,
      level_of_independence,
      area_size_level,
      type,
      description,
      requirementsForAdoption,
      organization_id,
    })
    return reply.status(201).send(pet)
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
