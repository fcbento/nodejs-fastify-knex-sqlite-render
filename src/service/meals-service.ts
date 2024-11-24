import { kknex as knex } from '../database'

export const createMeal = async (name: string, description: string, userId: string): Promise<void> => {
  await knex('meals').insert({
    id: crypto.randomUUID(),
    name,
    description,
    user_id: userId
  })
}