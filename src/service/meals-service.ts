import { kknex as knex } from '../database'
import { CreateMealRequest } from '../interfaces/create-meal.interface'

export const createMeal = async (request: CreateMealRequest): Promise<void> => {
  const {name, description, onDiet, userId} = request
  await knex('meals').insert({
    id: crypto.randomUUID(),
    name,
    description,
    on_diet: onDiet,
    user_id: userId
  })
}