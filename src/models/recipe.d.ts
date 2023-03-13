import Ingredient from "./ingredient"

export default interface Recipe {
  title: string
  content: string
  tagsRequired: string[],
  ingredients: { [key: string]: Ingredient }
}

export interface RecipeDisplayed {
  id: string,
  recipe: Recipe
}