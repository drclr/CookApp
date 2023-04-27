<!--
<template>
  <div data-test="select-form-component">
    <v-select ref="form-select" class="text-black" :name="name" :label="label" :items="options" :v-model="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)">
    </v-select>
    <error-message v-slot="{ message }" :name="name">
      <v-alert type="error"> {{ message }}</v-alert>
    </error-message>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup';
import { useField, ErrorMessage } from 'vee-validate';
const props = defineProps<{
  label: string,
  modelValue: string | number | null,
  options: Array<String>,
  name: string
}>();
useField(props.name, yup.string().required('At least one item must be selected'), {
  initialValue: props.modelValue
}
);
</script>
-->