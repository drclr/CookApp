<template>
  <div>
    <span v-if="ingredient.unit == 'none' && ingredient.quantity == '1'">
      {{ ingredient.quantity + ' ' + ingredient.name }}
    </span>
    <span v-if="ingredient.unit == 'none' && ingredient.quantity != '1'">
      {{ ingredient.quantity + ' ' + ingredient.name + 's' }}
    </span>
    <span v-if="ingredient.unit != 'none'">
      {{ ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit }}
    </span>
  </div>
</template >

<script setup lang ="ts">
import Ingredient from '@/models/ingredient'
defineProps<{
  ingredient: Ingredient,
}>();
</script>

<style scoped></style>
