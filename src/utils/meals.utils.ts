import { ZodObject, ZodRawShape, z } from "zod"

export const createMealObject = (): ZodObject<ZodRawShape> => {
  return z.object({
    name: z.string(),
    description: z.string(),
    onDiet: z.boolean(),
    userId: z.string()
  })
}

export const createIdObject = (): ZodObject<ZodRawShape> => {
  return z.object({
    id: z.string()
  })
}