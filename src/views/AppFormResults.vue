<template>
  <div class="d-flex flex-column align-center">

    <v-progress-circular v-if="store.recipesFromTags.length == 0" indeterminate></v-progress-circular>
    <CardRecipe v-else :data-test="item.recipe.title" v-for="item in store.recipesFromTags" :key="item.id"
      :recipe="item.recipe">
    </CardRecipe>
  </div>
</template>
<script lang="ts" setup>
import CardRecipe from '@/components/CardRecipe.vue'
import { onMounted } from 'vue'
import { useRecipeStore } from '@/store/recipe'

const store = useRecipeStore();
onMounted(async () => {
  await store.toDefineRecipesFromTags()
})
</script>