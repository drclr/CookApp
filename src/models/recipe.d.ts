export default interface Recipe {
  title: string
  content: string
  tagRequired: string[]
}

export interface RecipeDisplayed {
  id: string,
  recipe: Recipe
}