<template>
  <div v-for="item in ingredients" :ingredient="item" :key="item.name" :data-test="item.name">
    <span v-if="item.unit == 'none' && item.quantity == '1'">
      {{ item.quantity + ' ' + item.name }}
    </span>
    <span v-if="item.unit == 'none' && item.quantity != '1'">
      {{ item.quantity + ' ' + item.name + 's' }}
    </span>
    <span v-if="item.unit != 'none'">
      {{ item.name + ' : ' + item.quantity + ' ' + item.unit }}
    </span>
  </div>
</template>

<script setup lang="ts">
import Ingredient from '@/models/ingredient';
defineProps<{
  ingredients: { [key: string]: Ingredient }
}>();

</script>

<style scoped></style>