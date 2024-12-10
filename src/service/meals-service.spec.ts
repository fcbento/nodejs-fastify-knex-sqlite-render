import { describe, expect, it } from "vitest"
import { kknex as knex } from '../database'
import { deleteMeal, getAllMeals } from "./meals-service"

describe('Meals service', () => {
  
  it('should create a meal', async () => {

    await knex('meals').insert({
      name: 'Meat',
      description: 'Some meat',
      on_diet: false,
      user_id: '1',
      id: crypto.randomUUID(),
    })

    await knex('meals').insert({
      name: 'Fruits',
      description: 'Lots of fruits',
      on_diet: true,
      user_id: '1',
      id: crypto.randomUUID(),
    })

    const meals = await getAllMeals('1')

    expect(meals.length).toEqual(2)
  })

  it('should edit existing meal', async() => {

    await knex('meals').insert({
      name: 'Meat',
      description: 'Some meat',
      on_diet: false,
      user_id: '1',
      id: crypto.randomUUID(),
    })

    const meals = await getAllMeals('1')
    const meal = meals.find((meal) => meal.name === 'Meat')

    await knex('meals').update({
      name: 'ORANGE',
      description: 'Some meat',
      on_diet: true,
      user_id: '1'
    }).where('id', meal?.id)

    const mealsEdited = await getAllMeals('1')
    const mealEdited = mealsEdited.find((meal) => meal.name === 'ORANGE')

    expect(mealEdited?.name).toEqual('ORANGE')

  })

  it('should delete existing meal', async() => {

    await knex('meals').insert({
      name: 'Meat',
      description: 'Some meat',
      on_diet: false,
      user_id: '1',
      id: crypto.randomUUID(),
    })

    await knex('meals').insert({
      name: 'Fruits',
      description: 'Lots of fruits',
      on_diet: true,
      user_id: '1',
      id: crypto.randomUUID(),
    })

    const meals = await getAllMeals('1')
    const meal = meals.find((meal) => meal.name === 'ORANGE')
    
    if(!meal?.id) return;
    await deleteMeal(meal?.id)
    
    const mealsAfterDelete = await getAllMeals('1')
    expect(mealsAfterDelete).toHaveLength(4)
  })
})
