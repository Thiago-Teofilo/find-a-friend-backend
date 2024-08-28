import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'ORG3',
      latitude: -23.555456,
      longitude: -23.555456,
      phone: '4654656',
      password: '4654',
      email: 'thiagoteophilo@gmail.com',
      description: '',
    })

    expect(response.statusCode).toEqual(201)
  })
})
