import { defineStore } from 'pinia'
import Recipe, { RecipeDisplayed } from '@/models/recipe'
import { query, where, collection, getDocs } from "firebase/firestore"
import { useFirestore } from 'vuefire';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    tagsSelected: [] as string[],
    recipesFromTags: [] as RecipeDisplayed[]
  }),
  actions: {
    toDefineTagsSelectedFromForm(tags: string[]) {
      this.tagsSelected = tags;
    },
    async toDefineRecipesFromTags() {
      const db = useFirestore();
      const q = query(collection(db, "recipes"), where("tagsRequired", 'in', [this.tagsSelected]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.recipesFromTags.push({ id: doc.id, recipe: (doc.data() as Recipe) })
      })
    }
  }
})