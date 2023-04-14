<template>
  <v-card variant="outlined" class="w-75 pa-10 mt-10" min-width="300" min-height="200">

    <!--
    <InputForm :name="currentQuestion.id" v-if="currentQuestion && currentQuestion.type == 'input'"
      :modelValue="modelValue" :label="currentQuestion.label ? currentQuestion.label : ''"
      @update:modelValue="$emit('update:modelValue', $event)">
    </InputForm>
    -->

    <RadioForm v-if="currentQuestion && currentQuestion.type == 'radio'"
      :options="currentQuestion.optionsRadio ? currentQuestion.optionsRadio : []" :modelValue="modelValue"
      :name="currentQuestion.id" :label="currentQuestion.label ? currentQuestion.label : ''"
      @update:modelValue="$emit('update:modelValue', $event);"></RadioForm>

    <!--
    <SelectForm v-if="currentQuestion && currentQuestion.type == 'select'"
      :options="currentQuestion.optionsSelect ? currentQuestion.optionsSelect : []" :modelValue="modelValue"
      :name="currentQuestion.id" :label="currentQuestion.label ? currentQuestion.label : ''"
      @update:modelValue="$emit('update:modelValue', $event);">
    </SelectForm>
    -->

  </v-card>
</template>
<script lang="ts" setup>
import RadioForm from './RadioForm.vue';
//import SelectForm from './SelectForm.vue';
//import InputForm from './InputForm.vue';
import Question from '../models/question';

defineProps<{
  currentQuestion: Question,
  modelValue: string | number | null,
}>();

defineEmits(['update:modelValue']);
</script>