import { CardActions, CardHeader, Collapse, Grid, IconButton, IconButtonProps, styled } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import Recipe from '@/models/recipe'
import RecipeContent from '@/components/RecipeContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

type PropRecipeCard = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: PropRecipeCard) {
  const [isDetailsShown, setIsDetailsShown] = useState(false);

  function handleClick() {
    setIsDetailsShown(!isDetailsShown);
  }

  const Expand = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(90deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



  return (<Grid sx={{ width: 1 }} item xs={12} display="flex" justifyContent="center" alignItems="center">
    <Card sx={{ width: 3 / 4, mb: 5 }}>
      <CardActions>
        <CardHeader title={recipe.title}></CardHeader>
        <Expand
          expand={isDetailsShown}
          aria-expanded={isDetailsShown}
          aria-label="see recipe content"
          onClick={handleClick}
        >
          <ExpandMoreIcon />
        </Expand>
      </CardActions>
      <Collapse in={isDetailsShown} timeout="auto" unmountOnExit>
        <RecipeContent recipe={recipe}></RecipeContent>
      </Collapse>
    </Card>
  </Grid>
  )
}