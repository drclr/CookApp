<template>
  <v-card class="ma-6 pa-4 w-75 d-flex flex-column" min-height="300px" min-width="250px">
    <v-card-title class="text-h4 mb-4" ref="recipe-title">
      {{ recipe.title }}
    </v-card-title>
    <v-card-text ref="recipe-ingredients">
      <CardIngredients :ingredients="recipe.ingredients"></CardIngredients>
    </v-card-text>
    <v-card-text ref="recipe-content" class="my-3 mx-1">
      {{ recipe.content }}
    </v-card-text>
    <div class="d-flex" v-for="tag in recipe.tagsRequired" :key="tag">
      <v-chip :ref="'tag-' + tag" class="ma-1 text-white bg-blue-grey-darken-4"> {{ '#' + tag }}</v-chip>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import Recipe from '@/models/recipe'
import CardIngredients from './CardIngredients.vue';
defineProps<{
  recipe: Recipe
}>()
</script>