<template>
  <div>
    <div class="w-75 my-10 mx-auto">
      <v-btn variant="tonal" to='/recipes'>
        <v-icon class="me-2" icon="mdi-arrow-left"></v-icon>
        Choose another one</v-btn>
    </div>
    <div class="w-100 mb-10">
      <v-card v-if="recipe" class="pa-4 w-75 mx-auto d-flex flex-column" min-height="300">
        <div class="d-flex justify-space-between flex-wrap">
          <v-card-text class="text-h5 text-green-darken-3" ref="recipe-title">
            {{ recipe.title }}
          </v-card-text>
          <div class="d-flex text-subtitle-2 mt-3 me-5">
            <v-icon size="x-large" icon="mdi-clock-time-four-outline mt-2 me-2"></v-icon>
            <div>
              <div>
                <span> Preparation time : </span>
                <span> {{ recipe.preparationTime + ' min' }} </span>
              </div>
              <div>
                <span> Cooking time : </span>
                <span> {{ recipe.cookingTime + ' min' }}</span>
              </div>
            </div>
          </div>
        </div>
        <CardIngredients :ingredients="recipe.ingredients"></CardIngredients>
        <v-card-text ref="recipe-content" class="mx-1 my-0">
          <div v-for="(step, index) in recipe.content" :key="index">
            <div class="mb-5">
              <v-icon class="px-5" size="small" icon="mdi-chef-hat"></v-icon>
              <span> {{ step.charAt(0).toUpperCase() + step.slice(1) }} </span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardIngredients from './CardIngredients.vue';
import { useRecipeStore } from '@/store/recipe';
import { useRoute } from 'vue-router';
const route = useRoute();
const store = useRecipeStore();
const recipe = store.recipesFromTags.find(item => item.id == route.params.id);
</script>