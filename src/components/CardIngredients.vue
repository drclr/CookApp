<template>
  <div>
    <CardIngredient v-for="item in ingredients" :ingredient="item" :key="item.name">
    </CardIngredient>
  </div>
</template>

<script setup lang="ts">
import Ingredient from '@/models/ingredient';
import CardIngredient from '@/components/CardIngredient.vue'
defineProps<{
  ingredients: { [key: string]: Ingredient }
}>();

</script>

<style scoped></style>