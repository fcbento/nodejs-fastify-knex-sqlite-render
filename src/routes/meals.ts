import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { getSessionIdFromRequestCookie } from "../utils/users.utils"
import { createMealObject } from "../utils/meals.utils"
import { createMeal } from "../service/meals-service"
import { userExists } from "../service/users-service"

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const sessionId = getSessionIdFromRequestCookie(request)
    const { name, description, onDiet, userId } = createMealObject().parse(request.body)

    if (!sessionId) reply.status(405).send({ message: 'Not authorized' })

    try {
      await userExists(userId)
      createMeal({ name, description, onDiet, userId })
    } catch (err) {
      reply.status(400).send(err)
    }

    return reply.status(201).send()
  })
}


