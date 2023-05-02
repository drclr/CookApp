export interface Ingredient {
  quantity: string,
  unit: string,
  name: string
}

export default interface Recipe {
  id: string,
  title: string,
  content: string[],
  preparationTime: string,
  cookingTime: string,
  ingredients: { [key: string]: Ingredient }
}