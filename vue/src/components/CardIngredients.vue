<template>
  <div class="my-10 mx-5 d-flex flex-column justify-center">
    <div v-for="item in ingredients" :ingredient="item" :key="item.name" :data-test="item.name">
      <span class="text-overline" v-if="item.unit == 'none' && item.quantity == '1'">
        {{ item.quantity + ' ' + item.name }}
      </span>
      <span class="text-overline" v-if="item.unit == 'none' && item.quantity != '1'">
        {{ item.quantity + ' ' + item.name + 's' }}
      </span>
      <span class="text-overline" v-if="item.unit != 'none'">
        {{ item.name + ' : ' + item.quantity + ' ' + item.unit }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Ingredient from '@/models/ingredient';
defineProps<{
  ingredients: { [key: string]: Ingredient }
}>();

</script>