import { ZodObject, ZodRawShape, z } from "zod"

export const createMealObject = (): ZodObject<ZodRawShape> => {
  return z.object({
    name: z.string(),
    description: z.string(),
    user_id: z.string()
  })
}