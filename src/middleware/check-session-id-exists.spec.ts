
import { describe, it, expect, afterAll, beforeAll, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { execSync } from 'node:child_process'

const user = {
  name: 'New user test',
  age: 11
}

describe('Check session ID', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should get session from request cookies', async () => {
    const userCreated = await request(app.server).post('/users').send(user).expect(201)
    const cookies = userCreated.get('Set-Cookie')
    expect(cookies).toBeDefined()
  })

  it('should not get session from request cookies', async () => {
    const userCreated = await request(app.server).post('/users').send(user).expect(201)
    const cookies = userCreated.get('')
    expect(cookies).toBeUndefined()
  })
})