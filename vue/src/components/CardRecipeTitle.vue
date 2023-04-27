<template>
  <v-card class="mb-6 pa-4 w-75" min-width="250">
    <v-card-item>
      <div class="text-overline text-green-darken-3 font-weight-bold">
        {{ recipeTitle }}
      </div>
    </v-card-item>
    <v-card-actions>
      <v-btn variant="outlined" :to="'/recipe/' + recipeId">
        See details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  recipeTitle: string,
  recipeId: string
}>()
</script>