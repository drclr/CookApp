import { Ingredient } from '@/models/recipe'
import { Typography } from '@mui/material';

type IngredientProp = {
  ingredient: Ingredient
}

export default function Ingredient({ ingredient }: IngredientProp) {
  return (
    <Typography>
      {
        ingredient.unit == 'none' && ingredient.quantity == '1' ? ingredient.quantity + ' ' + ingredient.name :
          ingredient.unit == 'none' && ingredient.quantity != '1' ? ingredient.quantity + ' ' + ingredient.name + 's' :
            ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit
      }
    </Typography>
  )


}