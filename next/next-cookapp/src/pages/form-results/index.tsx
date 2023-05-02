import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { getDocs, query, where, getFirestore, collection } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';
import RecipeCard from '@/components/RecipeCard';
import Recipe from '@/models/recipe';
import AppHeader from '@/components/AppHeader';
import { Grid } from '@mui/material';

const db = getFirestore(firebaseApp);

export default function FormResults() {

  const router = useRouter();
  const tags = useRef<string[]>(router.query.tags as string[]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function toGetRecipes() {
    if (tags.current && tags.current.length > 0) {
      const tagsContraints = tags.current.map(tag => where(`tags.${tag}`, '==', true));
      const q = query(collection(db, 'recipes'), ...tagsContraints);
      const querySnapshot = await getDocs(q);
      let recipesArr: Recipe[] = [];
      querySnapshot.forEach((doc) => {
        recipesArr.push({ ...doc.data(), id: doc.id } as Recipe);
      })
      setRecipes([...recipesArr]);
    }
  }

  const recipesCard = recipes.map((item, index) => {
    return (<RecipeCard key={index} recipe={item}></RecipeCard >)
  })

  useEffect(() => {
    toGetRecipes();
  }, [])

  return (<>
    <AppHeader />
    <main>
      <Grid container sx={{ minWidth: 280, minHeight: 800, bgcolor: '#263238', pt: 5 }} display="flex" direction="column" alignItems="center">
        {recipesCard}
      </Grid>
    </main>
  </>)
}