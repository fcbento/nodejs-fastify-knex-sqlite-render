import { kknex as knex } from '../database'
import { CreateMealRequest } from '../interfaces/create-meal.interface'
import { Tables } from 'knex/types/tables'
import { Metrics } from '../interfaces/metrics.interface'
import { checkBestSequence } from '../utils/meals.utils'

export const createMeal = async (request: CreateMealRequest): Promise<void> => {
  const { name, description, onDiet, userId } = request
  await knex('meals').insert({
    id: crypto.randomUUID(),
    name,
    description,
    on_diet: onDiet,
    user_id: userId
  })
}

export const editMeal = async (request: CreateMealRequest, mealId: string): Promise<void> => {
  const { name, description, onDiet, userId } = request
  await knex('meals').update({
    name,
    description,
    on_diet: onDiet,
    user_id: userId
  }).where('id', mealId)
}

export const deleteMeal = async (mealId: string): Promise<void> => {
  await knex('meals').delete().where('id', mealId)
}

export const getAllMeals = async (userId: string): Promise<Tables['meals'][]> => {
  const meals = await knex('meals').where('user_id', userId).select()
  return meals
}

export const mealExists = async (mealId: string): Promise<Tables['meals']> => {
  const meal = await knex('meals').where('id', mealId).select().first()
  if (!meal) throw new Error('Meal dot not exist or id is missing')
  return meal
}

export const getMetrics = async (userId: string): Promise<Metrics> => {
  const meals = await getAllMeals(userId)
  return {
    total: meals?.length,
    totalMealsOnDiet: meals?.filter(meal => +meal?.on_diet === 1)?.length,
    totalMealsOutOfDiet: meals?.filter(meal => +meal?.on_diet === 0)?.length,
    bestSequenceOfMealsOnDiet: checkBestSequence(meals)
  }
}
