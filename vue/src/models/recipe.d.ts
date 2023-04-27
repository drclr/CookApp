import Ingredient from "./ingredient"

export default interface Recipe {
  id: string
  title: string,
  content: string[],
  preparationTime: string,
  cookingTime: string,
  ingredients: { [key: string]: Ingredient }
}