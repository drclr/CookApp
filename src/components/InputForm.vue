<!--
<template>
  <v-text-field :name="name" :model-value="modelValue" :label="label"
    @update:modelValue="$emit('update:modelValue', $event)">
  </v-text-field>
  <error-message v-slot="{ message }" :name="name">
    <v-alert type="error"> {{ message }}</v-alert>
  </error-message>
</template>
<script lang="ts" setup>

import { useField } from 'vee-validate';
import * as yup from 'yup';

defineEmits(['update:modelValue']);

const props = defineProps<{
  label: string,
  modelValue: string | number | undefined,
  name: string,
}>();

useField(props.name, yup.number().typeError('Only numbers are needed.').required('It is required field'), {
  initialValue: props.modelValue
});


</script>
-->
