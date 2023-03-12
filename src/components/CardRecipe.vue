<template>
  <v-card class="mt-4 w-75">
    <template v-slot:text>
      {{ recipe.title }}
    </template>
  </v-card>
</template>
<script lang="ts" setup>
import Recipe from '@/models/recipe'
defineProps<{
  recipe: Recipe
}>()
</script>