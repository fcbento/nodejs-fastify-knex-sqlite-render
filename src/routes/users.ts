import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'
import { createUserObject, getSessionIdFromRequestCookie, sessionIdVerifier } from '../utils/users.utils'
import { createUser, getUsers } from '../service/users-service'
export async function usersRoutes(app: FastifyInstance) {

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, age } = createUserObject().parse(request.body)
    const sessionId = getSessionIdFromRequestCookie(request)

    sessionIdVerifier(sessionId, reply)
    createUser(name, age, sessionId)

    return reply.status(201).send()
  })

  app.get('/', { preHandler: [checkSessionIdExists] }, async (request: FastifyRequest) => {
    const users = await getUsers(request)
    return { users, total: users?.length }
  })
}
