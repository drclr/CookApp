import Recipe from '@/models/recipe';
import { CardContent } from '@mui/material';
import Ingredient from './Ingredient';
import RecipeStep from './RecipeStep'

type PropRecipeCard = {
  recipe: Recipe
}

export default function RecipeContent({ recipe }: PropRecipeCard) {

  const recipeSteps = recipe.content.map((step, index) => {
    return (<RecipeStep key={index} step={step}></RecipeStep>)
  });

  const ingredients = Object.values(recipe.ingredients).map((ingredient, index) => {
    return (<Ingredient key={index} ingredient={ingredient}></Ingredient>)
  })

  return (<>
    <CardContent>
      {ingredients}
    </CardContent>
    <CardContent>
      {recipeSteps}
    </CardContent>
  </>
  )
}