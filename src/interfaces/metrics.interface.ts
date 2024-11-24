export interface Metrics {
  total: number
  totalMealsOnDiet: number
  totalMealsOutOfDiet: number
  bestSequenceOfMealsOnDiet: {
    bestOnDietSequence: number
    currentSequence: number
  }
}