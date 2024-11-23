
import { FastifyRequest } from 'fastify'
import { kknex as knex } from '../database'
import { getSessionIdFromRequestCookie } from '../utils/users.utils'

export const createUser = async (name: string, age: number, sessionId: string | undefined): Promise<void> => {
  await knex('users').insert({
    id: crypto.randomUUID(),
    name,
    age,
    session_id: sessionId,
  })
}

export const getUsers = async(request: FastifyRequest) => {
  const users = await knex('users').where('session_id', getSessionIdFromRequestCookie(request)).select()
  return users
}

