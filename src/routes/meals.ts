import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { createMealObject } from "../utils/meals.utils"
import { createMeal } from "../service/meals-service"
import { userExists } from "../service/users-service"
import { checkSessionIdExists } from "../middleware/check-session-id-exists"

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkSessionIdExists] }, async (request: FastifyRequest, reply: FastifyReply) => {

    const { name, description, onDiet, userId } = createMealObject().parse(request.body)

    try {
      await userExists(userId)
      createMeal({ name, description, onDiet, userId })
    } catch (err) {
      reply.status(400).send(err)
    }

    return reply.status(201).send()
  })
}


