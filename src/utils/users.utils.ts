import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z, ZodObject, ZodRawShape } from 'zod'

export const createUserObject = (): ZodObject<ZodRawShape> => {
  return z.object({
    name: z.string(),
    age: z.number(),
  })
}

export const getSessionIdFromRequestCookie = (request: FastifyRequest): string => {
  const { sessionId}  = request?.cookies
  return sessionId as string
 }
 
export const sessionIdVerifier = (sessionId: string | undefined, reply: FastifyReply): void => {
  if (!sessionId) {
    sessionId = randomUUID()
    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }
}