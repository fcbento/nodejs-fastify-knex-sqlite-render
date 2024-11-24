import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { getSessionIdFromRequestCookie, sessionIdVerifier } from "../utils/users.utils"
import { createMealObject } from "../utils/meals.utils"
import { createMeal } from "../service/meals-service"

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const sessionId = getSessionIdFromRequestCookie(request)
    const { name, description, userId } = createMealObject().parse(request.body)

    sessionIdVerifier(sessionId, reply)
    createMeal(name, description, userId)
    
    return reply.status(201).send()
  })
}


