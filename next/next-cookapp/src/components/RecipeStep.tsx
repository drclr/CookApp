import { Typography } from "@mui/material";

type RecipeStepProp = {
  step: string;
}

export default function RecipeStep({ step }: RecipeStepProp) {
  return (<Typography paragraph>
    {step}
  </Typography>)
}