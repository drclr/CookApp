<template>
  <v-label class="text-black"> {{ label }}</v-label>
  <v-radio-group class="text-black" @update:modelValue="$emit('update:modelValue', $event)" :model-value="modelValue">
    <v-radio v-for="opt in options" :key="opt.value" :label="opt.label" :value="opt.value" :name="name">
    </v-radio>
  </v-radio-group>
  <error-message v-slot="{ message }" :name="name">
    <v-alert type="error"> {{ message }}</v-alert>
  </error-message>
</template>
<script lang='ts' setup>
import { Option } from '../models/question';
import { ErrorMessage, useField } from 'vee-validate'
import * as yup from 'yup';
const props = defineProps<{
  options: Array<Option>,
  name: string,
  modelValue: string | number | null,
  label: string,
}>();

useField(props.name, yup.number().required('At least one item must be selected').typeError('At least one item must be selected'), {
  initialValue: props.modelValue
}
);

</script>