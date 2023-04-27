import { defineStore } from 'pinia'
import Recipe from '@/models/recipe'
import { query, where, collection, getDocs } from "firebase/firestore"
import { useFirestore } from 'vuefire';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipesFromTags: [] as Recipe[]
  }),
  actions: {
    async toDefineRecipesFromTags(tagsSelected: string[]) {
      const db = useFirestore();
      if (tagsSelected.length > 0) {
        const tagsContraints = tagsSelected.map(tag => where(`tags.${tag}`, '==', true));
        const q = query(collection(db, 'recipes'), ...tagsContraints);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.recipesFromTags.push({ ...doc.data() as Recipe, id: doc.id });
        })
      }
    },
    toResetRecipesFromTags() { this.recipesFromTags = [] },
  },
});