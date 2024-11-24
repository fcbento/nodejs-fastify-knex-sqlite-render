import { Tables } from "knex/types/tables"
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

export const checkBestSequence = (meals: Tables['meals'][]): { bestOnDietSequence: number, currentSequence: number } => {
  return meals.reduce((acc, meal) => {
    if (+meal.on_diet === 1) acc.currentSequence += 1
    else acc.currentSequence = 0

    if (acc.currentSequence > acc.bestOnDietSequence) acc.bestOnDietSequence = acc.currentSequence
    return acc
  }, { bestOnDietSequence: 0, currentSequence: 0 })
}