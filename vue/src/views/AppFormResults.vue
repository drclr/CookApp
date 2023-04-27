<template>
  <div class="d-flex flex-column align-center">
    <v-progress-circular v-if="store.recipesFromTags.length == 0" indeterminate></v-progress-circular>
    <v-btn class="my-10" variant="tonal" @click="toResetForm">
      <v-icon icon="mdi-restart"></v-icon>
      Form reset </v-btn>
    <template v-if="store.recipesFromTags.length > 0">
      <CardRecipeTitle :recipeId="item.id" :recipe-title="item.title" v-for="item in store.recipesFromTags"
        :key="item.id">
      </CardRecipeTitle>
    </template>
  </div>
</template>
<script lang="ts" setup>
import CardRecipeTitle from '@/components/CardRecipeTitle.vue';
import router from '@/router';
import { useRecipeStore } from '@/store/recipe'
const store = useRecipeStore();
function toResetForm() {
  store.toResetRecipesFromTags();
  router.push('/');
}
</script>